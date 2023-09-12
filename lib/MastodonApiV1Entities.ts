export interface Suggestion {
	/** The reason this account is being suggested. */
	source: string;/* (Enumerable oneOf)
		staff = This account was manually recommended by your administration team
		past_interactions = You have interacted with this account previously
		global = This account has many reblogs, favourites, and active local followers within the last 30 days */

	/** The account being recommended to follow. */
	account: Account;
};

export interface Translation {
	/** The translated text of the status. */
	content: string;/* (HTML) */

	/** The language of the source text, as auto-detected by the machine translation provider. */
	detected_source_language: string;/* (ISO 639 language code) */

	/** The service that provided the machine translation. */
	provider: string;
};

export interface WebPushSubscription {
	/** The ID of the Web Push subscription in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** Where push alerts will be sent to. */
	endpoint: string;/* (URL) */

	/** The streaming server’s VAPID key. */
	server_key: string;

	/** Which alerts should be delivered to the endpoint. */
	alerts: string;/* Hash */
};

export interface Token {
	/** An OAuth token to be used for authorization. */
	access_token: string;

	/** The OAuth token type. Mastodon uses Bearer tokens. */
	token_type: string;

	/** The OAuth scopes granted by this token, space-separated. */
	scope: string;

	/** When the token was generated. */
	created_at: number;/* (UNIX Timestamp) */
};

export interface Role {
	/** The ID of the Role in the database. */
	id: number;/* Integer */

	/** The name of the role. */
	name: string;

	/** The hex code assigned to this role. If no hex code is assigned, the string will be empty. */
	color: string;

	/** A bitmask that represents the sum of all permissions granted to the role. */
	permissions: number;/* Integer */

	/** Whether the role is publicly visible as a badge on user profiles. */
	highlighted: boolean;
};

export interface Status {
	/** ID of the status in the database. */
	id: string;/* (cast from an integer but not guaranteed to be a number) */

	/** URI of the status used for federation. */
	uri: string;

	/** The date when this status was created. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The account that authored this status. */
	account: Account;

	/** HTML-encoded status content. */
	content: string;/* (HTML) */

	/** Visibility of this status. */
	visibility: string;/* (Enumerable oneOf)
		public = Visible to everyone, shown in public timelines.
		unlisted = Visible to public, but not included in public timelines.
		private = Visible to followers only, and to any mentioned users.
		direct = Visible only to mentioned users. */

	/** Is this status marked as sensitive content? */
	sensitive: boolean;

	/** Subject or summary line, below which status content is collapsed until expanded. */
	spoiler_text: string;

	/** Media that is attached to this status. */
	media_attachments: MediaAttachment[];/* Array of MediaAttachment */

	/** The application used to post this status. */
	application: string;/* Hash */

	/** Mentions of users within the status content. */
	mentions: Status_Mention[];/* Array of Status::Mention */

	/** Hashtags used within the status content. */
	tags: Status_Tag[];/* Array of Status::Tag */

	/** Custom emoji to be used when rendering status content. */
	emojis: CustomEmoji[];/* Array of CustomEmoji */

	/** How many boosts this status has received. */
	reblogs_count: number;/* Integer */

	/** How many favourites this status has received. */
	favorites_count: number;/* Integer */

	/** How many replies this status has received. */
	replies_count: number;/* Integer */

	/** A link to the status’s HTML representation. */
	url?: string;/* (URL) */

	/** ID of the status being replied to. */
	in_reply_to_id?: string;/* (cast from an integer but not guaranteed to be a number) */

	/** ID of the account that authored the status being replied to. */
	in_reply_to_account_id?: string;/* (cast from an integer but not guaranteed to be a number) */

	/** The status being reblogged. */
	reblog?: Status;

	/** The poll attached to the status. */
	poll?: Poll;

	/** Preview card for links included within status content. */
	card?: PreviewCard;

	/** Primary language of this status. */
	language?: string;/* (ISO 639 Part 1 two-letter language code) */

	/** Plain-text source of a status. Returned instead of content when status is deleted, so the user may redraft from the source text without the client having to reverse-engineer the original text from the HTML content. */
	text?: string;

	/** Timestamp of when the status was last edited. */
	edited_at?: string;/* (ISO 8601 Datetime) */

	/** If the current token has an authorized user: Have you favourited this status? */
	favourited: boolean;

	/** If the current token has an authorized user: Have you boosted this status? */
	reblogged: boolean;

	/** If the current token has an authorized user: Have you muted notifications for this status’s conversation? */
	muted: boolean;

	/** If the current token has an authorized user: Have you bookmarked this status? */
	bookmarked: boolean;

	/** If the current token has an authorized user: Have you pinned this status? Only appears if the status is pinnable. */
	pinned: boolean;

	/** If the current token has an authorized user: The filter and keywords that matched this status. */
	filtered: FilterResult[];/* Array of FilterResult */
};

export interface Status_Mention {
	/** The account ID of the mentioned user. */
	'Mention-id': string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The username of the mentioned user. */
	'Mention-username': string;

	/** The location of the mentioned user’s profile. */
	'Mention-url': string;/* (URL) */

	/** The webfinger acct: URI of the mentioned user. Equivalent to username for local users, or username@domain for remote users. */
	'Mention-acct': string;
};

export interface Status_Tag {
	/** The value of the hashtag after the # sign. */
	'Tag-name': string;

	/** A link to the hashtag on the instance. */
	'Tag-url': string;/* (URL) */
};

export interface StatusEdit {
	/** The content of the status at this revision. */
	content: string;/* (HTML) */

	/** The content of the subject or content warning at this revision. */
	spoiler_text: string;/* (HTML) */

	/** Whether the status was marked sensitive at this revision. */
	sensitive: boolean;

	/** The timestamp of when the revision was published. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The account that published this revision. */
	account: Account;

	/** The current state of the poll options at this revision. Note that edits changing the poll options will be collapsed together into one edit, since this action resets the poll. */
	poll: string;/* Hash */

	/** The current state of the poll options at this revision. Note that edits changing the poll options will be collapsed together into one edit, since this action resets the poll. */
	media_attachments: MediaAttachment[];/* Array of MediaAttachment */

	/** Any custom emoji that are used in the current revision. */
	emojis: CustomEmoji[];/* Array of CustomEmoji */
};

export interface Tag {
	/** The value of the hashtag after the # sign. */
	name: string;

	/** A link to the hashtag on the instance. */
	url: string;/* (URL) */

	/** Usage statistics for given days (typically the past week). */
	history: string[];/* Array of Hash */

	/** Whether the current token’s authorized user is following this tag. */
	following: boolean;
};

export interface Admin_Tag {
	/** The ID of the Tag in the database. */
	id: string;/* (cast from integer, but not guaranteed to be a number) */

	/** Whether the hashtag has been approved to trend. */
	trendable: boolean;

	/** Whether the hashtag has not been disabled from auto-linking. */
	usable: boolean;

	/** Whether the hashtag has not been reviewed yet to approve or deny its trending. */
	requires_review: boolean;
};

export interface Poll {
	/** The ID of the poll in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** When the poll ends. */
	expires_at?: string;/* (ISO 8601 Datetime) */

	/** Is the poll currently expired? */
	expired: boolean;

	/** Does the poll allow multiple-choice answers? */
	multiple: boolean;

	/** How many votes have been received. */
	votes_count: number;/* Integer */

	/** How many unique accounts have voted on a multiple-choice poll. */
	voters_count?: number;/* Integer */

	/** Possible answers for the poll. */
	options: Poll_Option[];/* Array of Poll::Option */

	/** Custom emoji to be used for rendering poll options. */
	emojis: CustomEmoji[];/* Array of CustomEmoji */

	/** When called with a user token, has the authorized user voted? */
	voted: boolean;

	/** When called with a user token, which options has the authorized user chosen? Contains an array of index values for options. */
	own_votes: number[];/* Array of Integer */
};

export interface Poll_Option {
	/** The text value of the poll option. */
	'option-title': string;
};

export interface PreviewCard {
	/** Location of linked resource. */
	url: string;/* (URL) */

	/** Title of linked resource. */
	title: string;

	/** Description of preview. */
	description: string;

	/** The type of the preview card. */
	type: string;/* (Enumerable, oneOf)
		link = Link OEmbed
		photo = Photo OEmbed
		video = Video OEmbed
		rich = iframe OEmbed. Not currently accepted, so won’t show up in practice. */

	/** The author of the original resource. */
	author_name: string;

	/** A link to the author of the original resource. */
	author_url: string;/* (URL) */

	/** The provider of the original resource. */
	provider_name: string;

	/** A link to the provider of the original resource. */
	provider_url: string;/* (URL) */

	/** HTML to be used for generating the preview card. */
	html: string;/* (HTML) */

	/** Height of preview, in pixels. */
	height: number;/* Integer */

	/** Preview thumbnail. */
	image?: string;/* (URL) */

	/** Used for photo embeds, instead of custom html. */
	embed_url: string;/* (URL) */

	/** A hash computed by the BlurHash algorithm, for generating colorful preview thumbnails when media has not been downloaded yet. */
	blurhash?: string;
};

export interface Notification {
	/** The id of the notification in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The type of event that resulted in the notification. */
	type: string;/* (Enumerable oneOf)
		mention = Someone mentioned you in their status
		status = Someone you enabled notifications for has posted a status
		reblog = Someone boosted one of your statuses
		follow = Someone followed you
		follow_request = Someone requested to follow you
		favourite = Someone favourited one of your statuses
		poll = A poll you have voted in or created has ended
		update = A status you interacted with has been edited
		admin.sign_up = Someone signed up (optionally sent to admins)
		admin.report = A new report has been filed */

	/** The timestamp of the notification. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The account that performed the action that generated the notification. */
	account: Account;

	/** Status that was the object of the notification. Attached when type of the notification is favourite, reblog, status, mention, poll, or update. */
	status: Status;

	/** Report that was the object of the notification. Attached when type of the notification is admin.report. */
	report: Report;
};

export interface Report {
	/** The ID of the report in the database. */
	id: string;/* (cast from integer) */

	/** Whether an action was taken yet. */
	action_taken: boolean;

	/** When an action was taken against the report. */
	action_taken_at?: string;/* (ISO 8601 Datetime) */

	/** The generic reason for the report. */
	category: string;/* (Enumerable oneOf)
		spam = Unwanted or repetitive content
		violation = A specific rule was violated
		other = Some other reason */

	/** The reason for the report. */
	comment: string;

	/** Whether the report was forwarded to a remote domain. */
	forwarded: boolean;

	/** When the report was created. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** IDs of statuses that have been attached to this report for additional context. */
	status_ids?: string[];/* Array of String (cast from integer) */

	/** IDs of the rules that have been cited as a violation by this report. */
	rule_ids?: string[];/* Array of String (cast from integer) */

	/** The account that was reported. */
	target_account: Account;
};

export interface Context {
	/** Parents in the thread. */
	ancestors: Status[];/* Array of Status */

	/** Children in the thread. */
	descendants: Status[];/* Array of Status */
};

export interface IdentityProof {
	/** The name of the identity provider. */
	provider: string;

	/** The account owner’s username on the identity provider’s service. */
	provider_username: string;

	/** When the identity proof was last updated. */
	updated_at: string;/* (ISO 8601 Datetime) */

	/** A link to a statement of identity proof, hosted by the identity provider. */
	proof_url: string;/* (URL) */

	/** The account owner’s profile URL on the identity provider. */
	profile_url: string;/* (URL) */
};

export interface DomainBlock {
	/** The domain which is blocked. This may be obfuscated or partially censored. */
	domain: string;

	/** The SHA256 hash digest of the domain string. */
	digest: string;/* (SHA256) */

	/** The level to which the domain is blocked. */
	severity: string;/* (Enumerable, oneOf)
		silence = Users from this domain will be hidden from timelines, threads, and notifications (unless you follow the user).
		suspend = Incoming messages from this domain will be rejected and dropped entirely. */

	/** An optional reason for the domain block. */
	comment: string;
};

export interface Preferences {
	/** Default visibility for new posts. Equivalent to CredentialAccount#source[privacy]. */
	'posting-default-visibility': string;/* (Enumerable, oneOf)
		public = Public post
		unlisted = Unlisted post
		private = Followers-only post
		direct = Direct post */

	/** Default sensitivity flag for new posts. Equivalent to CredentialAccount#source[sensitive]. */
	'posting-default-sensitive': boolean;

	/** Default language for new posts. Equivalent to CredentialAccount#source[language] */
	'posting-default-language'?: string;/* (ISO 639-1 language two-letter code) */

	/** Whether media attachments should be automatically displayed or blurred/hidden. */
	'reading-expand-media': string;/* (Enumerable, oneOf)
		default = Hide media marked as sensitive
		show_all = Always show all media by default, regardless of sensitivity
		hide_all = Always hide all media by default, regardless of sensitivity */

	/** Whether CWs should be expanded by default. */
	'reading-expand-spoilers': boolean;
};

export interface FilterResult {
	/** The filter that was matched. */
	filter: Filter;

	/** The keyword within the filter that was matched. */
	keyword_matches?: string[];/* Array of String */

	/** The status ID within the filter that was matched. */
	status_matches?: string;
};

export interface Account {
	/** The account id. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The username of the account, not including domain. */
	username: string;

	/** The Webfinger account URI. Equal to username for local users, or username@domain for remote users. */
	acct: string;

	/** The location of the user’s profile page. */
	url: string;/* (URL) */

	/** The profile’s display name. */
	display_name: string;

	/** The profile’s bio or description. */
	note: string;/* (HTML) */

	/** An image icon that is shown next to statuses and in the profile. */
	avatar: string;/* (URL) */

	/** A static version of the avatar. Equal to avatar if its value is a static image; different if avatar is an animated GIF. */
	avatar_static: string;/* (URL) */

	/** An image banner that is shown above the profile and in profile cards. */
	header: string;/* (URL) */

	/** A static version of the header. Equal to header if its value is a static image; different if header is an animated GIF. */
	header_static: string;/* (URL) */

	/** Whether the account manually approves follow requests. */
	locked: boolean;

	/** Additional metadata attached to a profile as name-value pairs. */
	fields: Field[];/* Array of Field */

	/** Custom emoji entities to be used when rendering the profile. */
	emojis: CustomEmoji[];/* Array of CustomEmoji */

	/** Indicates that the account may perform automated actions, may not be monitored, or identifies as a robot. */
	bot: boolean;

	/** Indicates that the account represents a Group actor. */
	group: boolean;

	/** Whether the account has opted into discovery features such as the profile directory. */
	discoverable?: boolean;

	/** Whether the local user has opted out of being indexed by search engines. */
	noindex?: boolean;

	/** Indicates that the profile is currently inactive and that its user has moved to a new account. */
	moved?: Account;

	/** An extra attribute returned only when an account is suspended. */
	suspended: boolean;

	/** An extra attribute returned only when an account is silenced. If true, indicates that the account should be hidden behind a warning screen. */
	limited: boolean;

	/** When the account was created. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** When the most recent status was posted. */
	last_status_at?: string;/* (ISO 8601 Date) */

	/** How many statuses are attached to this account. */
	statuses_count: number;/* Integer */

	/** The reported followers of this profile. */
	followers_count: number;/* Integer */

	/** The reported follows of this profile. */
	following_count: number;/* Integer */
};

export interface CredentialAccount {
	/** An extra attribute that contains source values to be used with API methods that verify credentials and update credentials. */
	source: string;/* Hash */

	/** The role assigned to the currently authorized user. */
	role: Role;
};

export interface MutedAccount {
	/** When a timed mute will expire, if applicable. */
	mute_expires_at?: string;/* (ISO 8601 Datetime) */
};

export interface Field {
	/** The key of a given field’s key-value pair. */
	name: string;

	/** The value associated with the name key. */
	value: string;/* (HTML) */

	/** Timestamp of when the server verified a URL value for a rel=“me” link. */
	verified_at?: string;/* (ISO 8601 Datetime) if value is a verified URL. Otherwise, null. */
};

export interface Admin_Dimension {
	/** The unique keystring for the requested dimension. */
	key: string;

	/** The data available for the requested dimension. */
	data: string[];/* Array of Hash */
};

export interface Instance {
	/** The domain name of the instance. */
	domain: string;

	/** The title of the website. */
	title: string;

	/** The version of Mastodon installed on the instance. */
	version: string;

	/** The URL for the source code of the software running on this instance, in keeping with AGPL license requirements. */
	source_url: string;/* (URL) */

	/** A short, plain-text description defined by the admin. */
	description: string;

	/** Usage data for this instance. */
	usage: string;/* Hash */

	/** An image used to represent this instance. */
	thumbnail: string;/* Hash */

	/** Primary languages of the website and its staff. */
	languages: string[];/* Array of String (ISO 639-1 two-letter code) */

	/** Configured values and limits for this website. */
	configuration: string;/* Hash */

	/** Information about registering for this website. */
	registrations: string;/* Hash */

	/** Hints related to contacting a representative of the website. */
	contact: string;/* Hash */

	/** An itemized list of rules for this website. */
	rules: Rule[];/* Array of Rule */
};

export interface Reaction {
	/** The emoji used for the reaction. Either a unicode emoji, or a custom emoji’s shortcode. */
	name: string;

	/** The total number of users who have added this reaction. */
	count: number;/* Integer */

	/** If there is a currently authorized user: Have you added this reaction? */
	me: boolean;

	/** If the reaction is a custom emoji: A link to the custom emoji. */
	url: string;/* (URL) */

	/** If the reaction is a custom emoji: A link to a non-animated version of the custom emoji. */
	static_url: string;/* (URL) */
};

export interface MediaAttachment {
	/** The ID of the attachment in the database. */
	id: string;/* (cast from an integer but not guaranteed to be a number) */

	/** The type of the attachment. */
	type: string;/* (Enumerable, oneOf)
		unknown = unsupported or unrecognized file type
		image = Static image
		gifv = Looping, soundless animation
		video = Video clip
		audio = Audio track */

	/** The location of the original full-size attachment. */
	url: string;/* (URL) */

	/** The location of a scaled-down preview of the attachment. */
	preview_url: string;/* (URL) */

	/** The location of the full-size original attachment on the remote website. */
	remote_url?: string;/* (URL) */

	/** Metadata returned by Paperclip. */
	meta: string;/* Hash */

	/** Alternate text that describes what is in the media attachment, to be used for the visually impaired or when media attachments do not load. */
	description: string;

	/** A hash computed by the BlurHash algorithm, for generating colorful preview thumbnails when media has not been downloaded yet. */
	blurhash: string;/* (Blurhash) */
};

export interface Admin_DomainBlock {
	/** The ID of the DomainBlock in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The domain that is not allowed to federate. */
	domain: string;

	/** When the domain was blocked from federating. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The policy to be applied by this domain block. */
	severity: string;/* (Enumerable oneOf)
		silence = Account statuses from this domain will be hidden by default
		suspend = All incoming data from this domain will be rejected
		noop = Do nothing. Allows for rejecting media or reports */

	/** Whether to reject media attachments from this domain */
	reject_media: boolean;

	/** Whether to reject reports from this domain */
	reject_reports: boolean;

	/**  */
	private_comment?: string;

	/**  */
	public_comment?: string;

	/** Whether to obfuscate public displays of this domain block */
	obfuscate: boolean;
};

export interface Application {
	/** The name of your application. */
	name: string;

	/** The website associated with your application. */
	website?: string;/* (URL) */

	/** Used for Push Streaming API. Returned with POST /api/v1/apps. Equivalent to WebPushSubscription#server_key */
	vapid_key: string;

	/** Client ID key, to be used for obtaining OAuth tokens */
	client_id: string;

	/** Client secret key, to be used for obtaining OAuth tokens */
	client_secret: string;
};

export interface Relationship {
	/** The account ID. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** Are you following this user? */
	following: boolean;

	/** Are you receiving this user’s boosts in your home timeline? */
	showing_reblogs: boolean;

	/** Have you enabled notifications for this user? */
	notifying: boolean;

	/** Which languages are you following from this user? */
	languages: string[];/* Array of String (ISO 639-1 language two-letter code) */

	/** Are you followed by this user? */
	followed_by: boolean;

	/** Are you blocking this user? */
	blocking: boolean;

	/** Is this user blocking you? */
	blocked_by: boolean;

	/** Are you muting this user? */
	muting: boolean;

	/** Are you muting notifications from this user? */
	muting_notifications: boolean;

	/** Do you have a pending follow request for this user? */
	requested: boolean;

	/** Are you blocking this user’s domain? */
	domain_blocking: boolean;

	/** Are you featuring this user on your profile? */
	endorsed: boolean;

	/** This user’s profile bio */
	note: string;
};

export interface ScheduledStatus {
	/** ID of the scheduled status in the database. */
	id: string;/* (cast from an integer but not guaranteed to be a number) */

	/** The timestamp for when the status will be posted. */
	scheduled_at: string;/* (ISO 8601 Datetime) */

	/** The parameters that were used when scheduling the status, to be used when the status is posted. */
	params: string;/* Hash */

	/** Media that will be attached when the status is posted. */
	media_attachments: MediaAttachment[];/* Array of MediaAttachment */
};

export interface Admin_Report {
	/** The ID of the report in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** Whether an action was taken to resolve this report. */
	action_taken: boolean;

	/** When an action was taken, if this report is currently resolved. */
	action_taken_at?: string;/* (ISO 8601 Datetime) */

	/** The category under which the report is classified. */
	category: string;/* (Enumerable oneOf)
		spam = Malicious, fake, or repetitive content
		violation = Violates one or more specific rules
		other = The default (catch-all) category */

	/** An optional reason for reporting. */
	comment: string;

	/** Whether a report was forwarded to a remote instance. */
	forwarded: boolean;

	/** The time the report was filed. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The time of last action on this report. */
	updated_at: string;/* (ISO 8601 Datetime) */

	/** The account which filed the report. */
	account: Admin_Account;

	/** The account being reported. */
	target_account: Admin_Account;

	/** The account of the moderator assigned to this report. */
	assigned_account?: Admin_Account;

	/** The account of the moderator who handled the report. */
	action_taken_by_account?: Admin_Account;

	/** Statuses attached to the report, for context. */
	statuses: Status[];/* Array of Status */

	/** Rules attached to the report, for context. */
	rules: Rule[];/* Array of Rule */
};

export interface Announcement {
	/** The ID of the announcement in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The text of the announcement. */
	content: string;/* (HTML) */

	/** When the announcement will start. */
	starts_at?: string;/* (ISO 8601 Datetime) */

	/** When the announcement will end. */
	ends_at?: string;/* (ISO 8601 Datetime) */

	/** Whether the announcement is currently active. */
	published: boolean;

	/** Whether the announcement should start and end on dates only instead of datetimes. Will be false if there is no starts_at or ends_at time. */
	all_day: boolean;

	/** When the announcement was published. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** When the announcement was last updated. */
	updated_at: string;/* (ISO 8601 Datetime) */

	/** Whether the announcement has been read by the current user. */
	read: boolean;

	/** Accounts mentioned in the announcement text. */
	mentions: Announcement_Account[];/* Array of Announcement::Account */

	/** Statuses linked in the announcement text. */
	statuses: Announcement_Status[];/* Array of Announcement::Status */

	/** Tags linked in the announcement text. */
	tags: Status_Tag[];/* Array of Status::Tag */

	/** Custom emoji used in the announcement text. */
	emojis: CustomEmoji[];/* Array of CustomEmoji */

	/** Emoji reactions attached to the announcement. */
	reactions: Reaction[];/* Array of Reaction */
};

export interface Announcement_Account {
	/** The account ID of the mentioned user. */
	'Account-id': string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The username of the mentioned user. */
	'Account-username': string;

	/** The location of the mentioned user’s profile. */
	'Account-url': string;/* (URL) */

	/** The webfinger acct: URI of the mentioned user. Equivalent to username for local users, or username@domain for remote users. */
	'Account-acct': string;
};

export interface Announcement_Status {
	/** The ID of an attached Status in the database. */
	'Status-id': string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The URL of an attached Status. */
	'Status-url': string;/* (URL) */
};

export interface CustomEmoji {
	/** The name of the custom emoji. */
	shortcode: string;

	/** A link to the custom emoji. */
	url: string;/* (URL) */

	/** A link to a static copy of the custom emoji. */
	static_url: string;/* (URL) */

	/** Whether this Emoji should be visible in the picker or unlisted. */
	visible_in_picker: boolean;

	/** Used for sorting custom emoji in the picker. */
	category: string;
};

export interface FilterKeyword {
	/** The ID of the FilterKeyword in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The phrase to be matched against. */
	keyword: string;

	/** Should the filter consider word boundaries? See implementation guidelines for filters. */
	whole_word: boolean;
};

export interface V1_Instance {
	/** The domain name of the instance. */
	uri: string;

	/** The title of the website. */
	title: string;

	/** A short, plain-text description defined by the admin. */
	short_description: string;

	/** An HTML-permitted description of the Mastodon site. */
	description: string;

	/** An email that may be contacted for any inquiries. */
	email: string;

	/** The version of Mastodon installed on the instance. */
	version: string;

	/** URLs of interest for clients apps. */
	urls: string;/* Hash */

	/** Statistics about how much information the instance contains. */
	stats: string;/* Hash */

	/** Banner image for the website. */
	thumbnail?: string;/* (URL) */

	/** Primary languages of the website and its staff. */
	languages: string[];/* Array of String (ISO 639-1 two-letter code) */

	/** Whether registrations are enabled. */
	registrations: boolean;

	/** Whether registrations require moderator approval. */
	approval_required: boolean;

	/** Whether invites are enabled. */
	invites_enabled: boolean;

	/** Configured values and limits for this website. */
	configuration: string;/* Hash */

	/** A user that can be contacted, as an alternative to email. */
	contact_account: Account;

	/** An itemized list of rules for this website. */
	rules: Rule[];/* Array of Rule */
};

export interface ExtendedDescription {
	/** A timestamp of when the extended description was last updated. */
	updated_at: string;/* (ISO 8601 Datetime) */

	/** The rendered HTML content of the extended description. */
	content: string;/* (HTML) */
};

export interface FeaturedTag {
	/** The internal ID of the featured tag in the database. */
	id: string;/* (cast from integer but not guaranteed to be a number) */

	/** The name of the hashtag being featured. */
	name: string;

	/** A link to all statuses by a user that contain this hashtag. */
	url: string;/* (URL) */

	/** The number of authored statuses containing this hashtag. */
	statuses_count: number;

	/** The timestamp of the last authored status containing this hashtag. */
	last_status_at: string;/* (ISO 8601 Datetime) */
};

export interface V1_Filter {
	/** The ID of the filter in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The text to be filtered. */
	phrase: string;

	/** The contexts in which the filter should be applied. */
	context: string[];/* Array of String (Enumerable anyOf)
		home = home timeline and lists
		notifications = notifications timeline
		public = public timelines
		thread = expanded thread of a detailed status
		account = when viewing a profile */

	/** When the filter should no longer be applied. */
	expires_at?: string;/* (ISO 8601 Datetime) */

	/** Should matching entities in home and notifications be dropped by the server? See implementation guidelines for filters. */
	irreversible: boolean;

	/** Should the filter consider word boundaries? See implementation guidelines for filters. */
	whole_word: boolean;
};

export interface Error {
	/** The error message. */
	error: string;

	/** A longer description of the error, mainly provided with the OAuth API. */
	error_description: string;
};

export interface Admin_Cohort {
	/** The timestamp for the start of the period, at midnight. */
	period: string;/* (ISO 8601 Datetime) */

	/** The size of the bucket for the returned data. */
	frequency: string;/* (Enumerable oneOf)
		day = Daily buckets
		month = Monthly buckets */

	/** Retention data for users who registered during the given period. */
	data: CohortData[];/* Array of CohortData */
};

export interface CohortData {
	/** The timestamp for the start of the bucket, at midnight. */
	'date-date': string;/* (ISO 8601 Datetime) */

	/** The percentage rate of users who registered in the specified period and were active for the given date bucket. */
	rate: number;

	/** How many users registered in the specified period and were active for the given date bucket. */
	value: number;/* Integer */
};

export interface StatusSource {
	/** ID of the status in the database. */
	id: string;/* (cast from an integer but not guaranteed to be a number) */

	/** The plain text used to compose the status. */
	text: string;

	/** The plain text used to compose the status’s subject or content warning. */
	spoiler_text: string;
};

export interface Marker {
	/** The ID of the most recently viewed entity. */
	last_read_id: string;/* (cast from integer but not guaranteed to be a number)
		3.0.0 - addedundefined */

	/** An incrementing counter, used for locking to prevent write conflicts. */
	version: number;/* Integer */

	/** The timestamp of when the marker was set. */
	updated_at: string;/* (ISO 8601 Datetime)
		3.0.0 - addedundefined */
};

export interface Admin_EmailDomainBlock {
	/** The ID of the EmailDomainBlock in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The email domain that is not allowed to be used for signups. */
	domain: string;

	/** When the email domain was disallowed from signups. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** Usage statistics for given days (typically the past week). */
	history: string[];/* Array of Hash */
};

export interface Rule {
	/** An identifier for the rule. */
	name: string;/* (cast from integer, but not guaranteed to be a number) */

	/** The rule to be followed. */
	url: string;
};

export interface FamiliarFollowers {
	/** The ID of the Account in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** Accounts you follow that also follow this account. */
	accounts: Account[];/* Array of Account */
};

export interface FilterStatus {
	/** The ID of the FilterStatus in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The ID of the Status that will be filtered. */
	keyword: string;/* (cast from an integer, but not guaranteed to be a number) */
};

export interface Admin_IpBlock {
	/** The ID of the DomainBlock in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The IP address range that is not allowed to federate. */
	ip: string;/* (IP address and prefix) */

	/** The associated policy with this IP block. */
	severity: string;/* (Enumerable, oneOf)
		sign_up_requires_approval = Any signup from this IP range will create a pending account
		sign_up_block = Any signup from this IP range will be rejected
		no_access = Any activity from this IP range will be rejected entirely */

	/** The recorded reason for this IP block. */
	comment: string;

	/** When the IP block was created. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** When the IP block will expire. */
	expires_at?: string;/* (ISO 8601 Datetime) */
};

export interface Conversation {
	/** The ID of the conversation in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** Is the conversation currently marked as unread? */
	unread: boolean;

	/** Participants in the conversation. */
	accounts: Account[];/* Array of Account */

	/** The last status in the conversation. */
	last_status?: Status;
};

export interface Admin_Account {
	/** The ID of the account in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The username of the account. */
	username: string;

	/** The domain of the account, if it is remote. */
	domain?: string;

	/** When the account was first discovered. */
	created_at: string;/* (ISO 8601 Datetime) */

	/** The email address associated with the account. */
	email: string;

	/** All known IP addresses associated with this account. */
	ip: Admin_Ip[];/* Array of Admin::Ip */

	/** The locale of the account. */
	locale: string;/* (ISO 639 Part 1 two-letter language code) */

	/** The reason given when requesting an invite (for instances that require manual approval of registrations) */
	invite_request?: string;

	/** The current role of the account. */
	role: Role;

	/** Whether the account has confirmed their email address. */
	confirmed: boolean;

	/** Whether the account is currently approved. */
	approved: boolean;

	/** Whether the account is currently disabled. */
	disabled: boolean;

	/** Whether the account is currently silenced. */
	silenced: boolean;

	/** Whether the account is currently suspended. */
	suspended: boolean;

	/** User-level information about the account. */
	account: Account;

	/** The ID of the Application that created this account, if applicable. */
	created_by_application_id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The ID of the Account that invited this user, if applicable. */
	invited_by_account_id: string;/* (cast from an integer, but not guaranteed to be a number) */
};

export interface Admin_Measure {
	/** The unique keystring for the requested measure. */
	key: string;

	/** The units associated with this data item’s value, if applicable. */
	unit?: string;

	/** The numeric total associated with the requested measure. */
	total: string;/* (cast from integer) */

	/** A human-readable formatted value for this data item. */
	'data-human_value': string;

	/** The numeric total associated with the requested measure, in the previous period. Previous period is calculated by subtracting the start_at and end_at dates, then offsetting both start and end dates backwards by the length of the time period. */
	previous_total: string;/* (cast from integer) */

	/** The data available for the requested measure, split into daily buckets. */
	data: string[];/* Array of Hash */
};

export interface Admin_DomainAllow {
	/** The ID of the DomainAllow in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The domain that is allowed to federate. */
	domain: string;

	/** When the domain was allowed to federate. */
	created_at: string;/* (ISO 8601 Datetime) */
};

export interface Filter {
	/** The ID of the Filter in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** A title given by the user to name the filter. */
	title: string;

	/** The contexts in which the filter should be applied. */
	context: string[];/* Array of String (Enumerable, anyOf)
		home = home timeline and lists
		notifications = notifications timeline
		public = public timelines
		thread = expanded thread of a detailed status
		account = when viewing a profile */

	/** When the filter should no longer be applied. */
	expires_at?: string;/* (ISO 8601 Datetime) */

	/** The action to be taken when a status matches this filter. */
	filter_action: string;/* (Enumerable, oneOf)
		warn = show a warning that identifies the matching filter by title, and allow the user to expand the filtered status. This is the default (and unknown values should be treated as equivalent to warn).
		hide = do not show this status if it is received */

	/** The keywords grouped under this filter. */
	keywords: FilterKeyword[];/* Array of FilterKeyword */

	/** The statuses grouped under this filter. */
	statuses: FilterStatus[];/* Array of FilterStatus */
};

export interface Admin_Ip {
	/** The IP address. */
	id: string;/* (IP address) */

	/** The timestamp of when the IP address was last used for this account. */
	used_at: string;/* (ISO 8601 Datetime) */
};

export interface Search {
	/** Accounts which match the given query */
	accounts: Account[];/* Array of Account */

	/** Statuses which match the given query */
	statuses: Status[];/* Array of Status */

	/** Hashtags which match the given query */
	hashtags: Tag[];/* Array of Tag */
};

export interface List {
	/** The internal database ID of the list. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The user-defined title of the list. */
	title: string;

	/** Which replies should be shown in the list. */
	replies_policy: string;/* (Enumerable oneOf)
		followed = Show replies to any followed user
		list = Show replies to members of the list
		none = Show replies to no one */
};

export interface Admin_CanonicalEmailBlock {
	/** The ID of the email block in the database. */
	id: string;/* (cast from an integer, but not guaranteed to be a number) */

	/** The SHA256 hash of the canonical email address. */
	canonical_email_hash: string;/* (SHA256) */
};