import {
  DOMParser,
  Element,
  Node,
  NodeType,
  initParser,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm-noinit.ts";
await initParser();

interface Attribute {
  name: string;
  type: string;
  description: string;
  typeDescription?: string;
  nullable: boolean;
}

type AttributeSet = Record<string, Attribute>;

const parseDataType = (entityName: string, dataType: string): string => {
  dataType = dataType.trim();
  // if (dataType.indexOf('::') >= 0) {
  //   return parseDataType(entityName, dataType.split("::")[1]);
  // }
  const lc = dataType.toLocaleLowerCase();
  if (lc.startsWith('array of')) {
    return `${parseDataType(entityName, dataType.slice('array of'.length + 1))}[]`;
  }
  const knownTypes = ['string', 'boolean', 'number'];
  for (const knownType of knownTypes) {
    if (lc.startsWith(knownType)) return knownType;
  }
  if (lc.startsWith('integer')) {
    return 'number';
  }
  if (lc.startsWith('hash')) {
    return 'string';
  }
  // if (dataType.startsWith(`${entityName}::`)) {
  //   dataType = dataType.slice(entityName.length + 2);
  // }
  return dataType;
}

const formatType = (type: string) =>
  type.replaceAll('::', '_');
const formatKey = (key: string) => 
  (key.indexOf("-") >= 0 || key.indexOf(':') >= 0) ? `'${formatType(key)}'` : formatType(key);

const formatInterface = (name: string, attributes: AttributeSet) => `export interface ${formatType(name)} {
${ Object.entries(attributes).map( ([name, a]) =>
  `${"\t"}/** ${a.description} */${"\n\t"}${formatKey(a.name)}${ a.nullable ? '?' : ''}: ${formatType(a.type)};${ (a.typeDescription ?? "").length > 0 ? `/* ${a.typeDescription} */` : ""}`
).join("\n\n")}
};`;

const parseAttribute = (entityName: string, attributeName: string, paragraphTag: Element) => {
  const attribute: Attribute = {nullable: false, name: attributeName, description: "", type: ""};
  for (let childIndex = 0; childIndex < paragraphTag.childNodes.length - 1; childIndex++) {
    const node = paragraphTag.childNodes[childIndex];
    if (node.nodeType == NodeType.ELEMENT_NODE && (node as Element).tagName === "STRONG") {
      const type = node.textContent.trim().slice(0, -1);
      if (type === "Version history") continue;
      let text = "";
      // See if data is in first node
      while (childIndex < paragraphTag.childNodes.length) {
        const next = paragraphTag.childNodes[childIndex + 1];
        if (next != null && "tagName" in next && (next as Element).tagName === "STRONG") break;
        childIndex++;
        if (next != null && "tagName" in next && (next as Element).tagName === "BR") {
          text += "\n\t\t";
        } else {
          text += next?.textContent;
        }
      }
      text = text.trim();
      if (type === "Type" && text) {
        if (text.trim().startsWith("nullable")) {
          attribute.nullable = true;
          // Special case for ", or null"
          if (text.indexOf(', or null') >= 0) {
            text = text.slice(0, text.indexOf(', or null'));
          }
          text = text.slice("nullable".length).replace('or null','').trim();
        }
        attribute.type = parseDataType(entityName, text.trim());
        let typeDescription = text.trim();
        if (typeDescription.toLocaleLowerCase().startsWith(attribute.type.toLocaleLowerCase())) {
          typeDescription = typeDescription.slice(attribute.type.length).trim();
        }
        attribute.typeDescription = typeDescription;
      }
      if (type === "Description" && text) {
        attribute.description = text;
      }
    }
  }
  return attribute;
}

const entitiesAttributes: {[entity: string]: AttributeSet} = {};

const loadFileEntity = async (fileEntity: string) => {
  if (entitiesAttributes[fileEntity] != null) {
    return;
  }
  // console.log(`loading entity ${fileEntity}`);
  const response = await fetch(`https://docs.joinmastodon.org/entities/${fileEntity.replaceAll('::','_')}/`);
  const htmlResponse = await response.text();
  const htmlDocument = new DOMParser().parseFromString(htmlResponse, "text/html");
  if (htmlDocument == null) throw new Error("page not found");
  const contentElement = htmlDocument.querySelector('div.e-content');
  if (contentElement == null) throw new Error(`content not found for ${fileEntity}`);
  let entity: string | undefined;
  let attributeName: string | undefined;
  for (const node of contentElement.children) {
    if (node.tagName === "H2") {
      const attributesSuffix = " attributes";
      if (node.id === "example" || node.id === "see-also" || node.id === "reasons" || node.id.indexOf('-') >= 0) {
        entity = undefined;
      } else {
        entity = node.id === "attributes" ? fileEntity : 
          node.textContent.trim().replaceAll(' attributes','').replaceAll(' entity','');
        if (entity === "Examples") entity = undefined;
      }
    }
    if (entity) {
      if (node.tagName === "H3") {
        attributeName = node.textContent.split(' ')[0].trim();
        if (attributeName?.startsWith(`${entity}-`)) {
          attributeName = attributeName.slice(entity.length + 1);
        }
      }
      if (node.tagName === "P" && attributeName != null) {
        const attribute = parseAttribute(entity, attributeName, node);
        entitiesAttributes[entity] ||= {};
        entitiesAttributes[entity][attributeName] = attribute;
        attributeName = undefined;
      }
    }
  }
};



const loadFileEntityNames = async () => {
  const response = await fetch(`https://docs.joinmastodon.org/entities/`);
  const htmlResponse = await response.text();
  const htmlDocument = new DOMParser().parseFromString(htmlResponse, "text/html");
  const entityNames: string[] = [];
  if (htmlDocument == null) throw new Error("page not found");
  const contentElement = htmlDocument.querySelector('ul[id="posts"]');
  if (contentElement == null) throw new Error(`No entities found`);
  for (const possibleListNode of contentElement.children) {
    if (possibleListNode.tagName === "LI") {
      for (const possibleANode of possibleListNode.children) {
        if (possibleANode.tagName === "A") {
          const entityName = possibleANode.textContent;
          entityNames.push(entityName)
        }
      }
    }
  }
  return entityNames;
};


const loadAllFileEntities = async () => {
  const fileEntities = await loadFileEntityNames();
  await Promise.all(fileEntities.map( entityName => loadFileEntity(entityName)));
  const interfaceText = Object.entries(entitiesAttributes)
    .map( ([name, attributes]) => formatInterface(name, attributes))
    .join("\n\n");
  Deno.writeTextFileSync("./lib/MastodonApiV1Entities.ts",
  `// Mastodon API V1 Entities
// Generated by: https://github.com/UppaJung/mastodon-api-entities-ts
// Generated on: ${ new Date().toISOString() }
// spell-checker: disable

` +
  interfaceText, );
}

loadAllFileEntities();