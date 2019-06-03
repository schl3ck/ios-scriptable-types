/**
 * _Presents an alert._
 * 
 * Use this to configure an alert presented modally or as a sheet. After configuring the alert, call presentAlert() or presentSheet() to present the alert. The two presentations methods will return a value which carries the index of the action that was selected when fulfilled.
 */
export class Alert {
	/**
	 * Title displayed in the alert. Usually a short string.
	 */
	title: string
	
	/**
	 * Detailed message displayed in the alert.
	 */
	message: string
	
	/**
	 * _Constructs a new alert._
	 */
	constructor()
	
	/**
	 * _Adds an action to the alert._
	 * 
	 * Adds an action button to the alert. To check if an action was selected, you should use the first parameter provided when the promise returned by presentAlert() and presentSheet() is resolved.
	 */
	addAction(title: string)
	
	/**
	 * _Adds a destructive action to the alert._
	 * 
	 * Destructive actions titles have a red text color, signaling that the action may modify or delete data.
	 */
	addDestructiveAction(title: string)
	
	/**
	 * _Adds a cancel action to the alert._
	 * 
	 * Adds a cancel action to the alert. When a cancel action is selected the index provided by presentAlert() or presentSheet() will always be -1.
	 */
	addCancelAction(title: string)
	
	/**
	 * _Adds a text field prompting for user input._
	 * 
	 * Adds a text field to the alert controller prompting for user input. Retrieve the value for the text field using textFieldValue() and supply the index of the text field. Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
	 * 
	 * Text fields are not supported when using the sheet presentation.
	 */
	addTextField(placeholder: string, text: string)
	
	/**
	 * _Adds a secure text field prompting for user input._
	 * 
	 * Adds a secure text field to the alert controller prompting for user input. Values entered into a secure text field will be hidden behind dots. Retrieve the value for the text field using textFieldValue() and supply the index of the text field. Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
	 */
	addSecureTextField(placeholder: string, text: string)
	
	/**
	 * _Retrieves value of a text field._
	 * 
	 * Retrieves the value of a text field added using addTextField() or addSecureTextField(). Indices for text fields are assigned in the same order as they are added to the alert starting at 0.
	 */
	textFieldValue(index: number): string
	
	/**
	 * _Presents the alert modally._
	 * 
	 * This is a shorthand for presentAlert().
	 */
	present(): Promise<number>
	
	/**
	 * _Presents the alert modally._
	 */
	presentAlert(): Promise<number>
	
	/**
	 * _Presents the alert as a sheet._
	 */
	presentSheet(): Promise<number>
}



/**
 * _Arguments passed to the script._
 * 
 * Arguments are passed to the script when the script is executed from a share sheet. You can specify the types of arguments a script supports from the script settings.
 */
export interface args {
	/**
	 * _Number of arguments supplied by a share sheet._
	 * 
	 * @deprecated Deprecated in version 1.3. Instead of relying on this property, take the length of the array containing the data type you are interested in.
	 * 
	 * The number of arguments passed to the script from the share seeht.
	 */
	length: number
	
	/**
	 * _All arguments supplied by a share sheet._
	 * 
	 * @deprecated Deprecated in version 1.3. Instead of relying on this property, access the array containing the data type you are interested in.
	 * 
	 * All arguments supplied by the share sheet.
	 */
	all: any[]
	
	/**
	 * _Plain text arguments supplied by a share sheet._
	 * 
	 * All plain texts passed to the script from a share sheet.
	 * 
	 * If you have enabled "Text" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares plain text.
	 */
	plainTexts: string[]
	
	/**
	 * _URL arguments supplied by a share sheet._
	 * 
	 * All URLs passed to the script from a share sheet.
	 * 
	 * If you have enabled "URLs" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares URLs.
	 */
	urls: string[]
	
	/**
	 * _File URL arguments supplied by a share sheet._
	 * 
	 * All file URLs passed to the script from a share sheet.
	 * 
	 * If you have enabled "File URLs" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares URLs pointing to a file.
	 */
	fileURLs: string[]
	
	/**
	 * _Image arguments._
	 * 
	 * All images passed to the script from a share sheet.
	 * 
	 * If you have enabled "Images" as a share sheet input from the script settings, the script can be run from any share sheet throughout the system that shares images.
	 */
	images: Image[]
	
	/**
	 * _Query parameters from a URL scheme._
	 * 
	 * Query parameters are supplied to a script when running it from a URL scheme. See the documentation on Scriptables URL schems for more information.
	 */
	queryParameters: {string: string}
	
	/**
	 * _Arguments passed from a Siri Shortcut._
	 * 
	 * When creating a Siri Shortcut in Scriptable, you can define arguments that are passed to the script when the shortcut is run. This lets you differentiate the behaviour of a script based on some predefiend arguments.
	 * 
	 * For example, a script that checks the wather may expect an argument with the key "city". When creating a Siri Shortcut for the script, the argument should be passed with the value containing the name of the city to to check the weather for.
	 */
	siriShortcutArguments: {string: string}
	
	/**
	 * _Notification being handled by the script._
	 * 
	 * The notification that a script is being run in or the application was opened from.
	 * 
	 * The notification contains all information that was set when the notification was originally scheduled, including the `userInfo` property which can be used to contain custom data that might be relevant when running the script.
	 */
	notification: Notification
}



/**
 * _Holds reminders and events._
 * 
 * Use the Calendar type to get a specific calendar. The calendar is used with the Reminder and CalendarEvent types when fetching reminders or events from a specific calendar or when inserting into a calendar. If you are fetching reminders or events from all calendars, you do not need to pass the calendars when performing the fetch with the Reminder or CalendarEvent types.
 */
export class Calendar {
	/**
	 * _Calendar identifier._
	 */
	identifier: string
	
	/**
	 * _Title of calendar._
	 */
	title: string
	
	/**
	 * _Whether the calendar is a subscribed calendar._
	 */
	isSubscribed: bool
	
	/**
	 * _Indicates whether items can be added, edited, and deleted in the calendar._
	 */
	allowsContentModifications: bool
	
	/**
	 * _Color of calendar._
	 */
	color: Color
	
	/**
	 * _Checks if the calendar supports availability._
	 * 
	 * The following values are supported:
	 * 
	 * *   busy
	 * *   free
	 * *   tentative
	 * *   unavailable
	 * 
	 * Not all calendars support all of these availabilities and some calendars may not support availability at all. Use this function to check if the calendar supports a specific availability.
	 */
	supportsAvailability(availability: string): bool
	
	/**
	 * _Saves calendar._
	 * 
	 * Saves changes to the calendar.
	 */
	save()
	
	/**
	 * _Fetches calendars for reminders._
	 * 
	 * A calendar can only hold either reminders or events. Call this function to fetch all calendars that can hold reminders.
	 */
	static forReminders(): Promise<Calendar[]>
	
	/**
	 * _Fetches calendars for events._
	 * 
	 * A calendar can only hold either reminders or events. Call this function to fetch all calendars that can hold events.
	 */
	static forEvents(): Promise<Calendar[]>
	
	/**
	 * _Fetches a calendar that holds reminders._
	 */
	static forRemindersByTitle(title: string): Promise<Calendar>
	
	/**
	 * _Fetches a calendar that holds events._
	 */
	static forEventsByTitle(title: string): Promise<Calendar>
	
	/**
	 * _Default calendar for reminders._
	 * 
	 * A calendar can only hold either reminders or events. Call this function to get the default calendar that can hold reminders.
	 */
	static defaultForReminders(): Promise<Calendar>
	
	/**
	 * _Default calendar for events._
	 * 
	 * A calendar can only hold either reminders or events. Call this function to get the default calendar that can hold events.
	 */
	static defaultForEvents(): Promise<Calendar>
	
	/**
	 * _Presents a view for picking calendars._
	 */
	static presentPicker(allowMultiple: bool): Promise<Calendar[]>
}



export namespace CalendarEvent {
	declare interface Attendees {
		"isCurrentUser": boolean,
		"name": string,
		"status": string,
		"type": string,
		"role": string
	}
}

/**
 * _Manages events in calendars._
 * 
 * Used for creating, fetching and removing events from your calendars.
 */
export class CalendarEvent {
	/**
	 * _Identifier of event._
	 */
	identifier: string
	
	/**
	 * _Title of event._
	 */
	title: string
	
	/**
	 * _Location of event._
	 */
	location: string
	
	/**
	 * _Notes associated with event._
	 */
	notes: string
	
	/**
	 * _Start date of event._
	 */
	startDate: Date
	
	/**
	 * _End date of event._
	 */
	endDate: Date
	
	/**
	 * _Whether the event is an all-day event._
	 */
	isAllDay: bool
	
	/**
	 * _Attendees associated with the event._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "isCurrentUser": false,
	 *       "name": "John Appleseed",
	 *       "status": "accepted",
	 *       "type": "person",
	 *       "role": "required"
	 *     }
	 * 
	 * Note that the property is read-only since iOS does not expose API to modify the attendees of an event.
	 */
	attendees: CalendarEvent.Attendees[]
	
	/**
	 * _Availability during the event._
	 * 
	 * Indicates how the event should be treated for scheduling purposes. The following values are supported:
	 * 
	 * *   busy
	 * *   free
	 * *   tentative
	 * *   unavailable
	 * 
	 * Be aware that not all calendars support all of these availabilities and some calendars may not support availability at all. Use `Calendar.supportsAvailability()` to check if a calendar supports a specific availability.
	 */
	availability: string
	
	/**
	 * _Time zone of event._
	 * 
	 * Geopolitical region identifier that identifies the time zone, e.g. "Europe/Copenhagen", "America/New\_York" and "Asia/Tokyo".
	 */
	timeZone: string
	
	/**
	 * _Calendar the event is stored in._
	 */
	calendar: Calendar
	
	/**
	 * _Constructs an event._
	 * 
	 * In order to add the event to your calendar, you must call the save() function.
	 */
	constructor()
	
	/**
	 * _Adds a recurrence rule._
	 * 
	 * Recurrence rules specify when the reminder should be repeated. See the documentation of RecurrenceRule for more information on creating rules.
	 */
	addRecurrenceRule(recurrenceRule: RecurrenceRule)
	
	/**
	 * _Removes all recurrence rules._
	 */
	removeAllRecurrenceRules()
	
	/**
	 * _Saves event._
	 * 
	 * Saves changes to an event, inserting it into the calendar if it is newly created.
	 */
	save()
	
	/**
	 * _Removes event from calendar._
	 */
	remove()
	
	/**
	 * _Presents a view for editing the calendar event._
	 * 
	 * The presented view supports editing various attributes of the event, including title, location, dates, recurrence and alerts.
	 */
	presentEdit(): Promise<CalendarEvent>
	
	/**
	 * _Presents a view for creating a calendar event._
	 * 
	 * The presented view supports editing various attributes of the event, including title, location, dates, recurrence and alerts.
	 */
	static presentCreate(): Promise<CalendarEvent>
	
	/**
	 * _Events occurring today._
	 */
	static today(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events occurring tomorrow._
	 */
	static tomorrow(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events that occurred yesterday._
	 */
	static yesterday(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events that occur this week._
	 */
	static thisWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events that occur next week._
	 */
	static nextWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events that occurred last week._
	 */
	static lastWeek(calendars: Calendar[]): Promise<CalendarEvent[]>
	
	/**
	 * _Events that occurs between two dates._
	 */
	static between(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<CalendarEvent[]>
}



/**
 * _Open x-callback-url requests._
 * 
 * Opens apps that support x-callback-url and waits for a response from the target application. You can find a list of apps that support x-callback-url at [x-callback-url.com/apps](http://x-callback-url.com/apps/).
 */
export class CallbackURL {
	/**
	 * _Construct CallbackURL._
	 * 
	 * Constructs an object that opens x-callback-url requests and waits for a response from the target app.
	 */
	constructor(baseURL: string)
	
	/**
	 * _Construct CallbackURL._
	 * 
	 * Appends a key/value pair to the base URL as a query parameter. The name and value are automatically encoded. Do not add the x-callback-url paramters, i.e. x-source, x-success, x-error and x-cancel as Scriptable will add those.
	 */
	addParameter(name: string, value: string)
	
	/**
	 * _Opens the callback URL._
	 * 
	 * Opens the target app and waits for the target app to perform the action. The returned promise contains the query parameters supplied by the target app when it invokes the callback. If the action failed in the target app or the action was cancelled, the promise will be rejected. The promise is also rejected if the action times out because the target app did not invoke the callback.
	 */
	open(): Promise<{string: string}>
	
	/**
	 * _Creates the callback URL._
	 * 
	 * Creates a callback URL with the specified base URL and query parameters.
	 */
	getURL(): string
}



/**
 * _Stores color data including opacity._
 * 
 * A color can be created using a hex value, e.g. #FF0000 and optionally an alpha or it can be created using the provided system colors.
 */
export class Color {
	/**
	 * _HEX representation._
	 */
	hex: string
	
	/**
	 * _Amount of red in the color._
	 */
	red: number
	
	/**
	 * _Amount of green in the color._
	 */
	green: number
	
	/**
	 * _Amount of blue in the color._
	 */
	blue: number
	
	/**
	 * _Alpha of the color._
	 */
	alpha: number
	
	/**
	 * _Constructs a black color._
	 */
	static black(): Color
	
	/**
	 * _Constructs a dark gray color._
	 */
	static darkGray(): Color
	
	/**
	 * _Constructs a light gray color._
	 */
	static lightGray(): Color
	
	/**
	 * _Constructs a white color._
	 */
	static white(): Color
	
	/**
	 * _Constructs a gray color._
	 */
	static gray(): Color
	
	/**
	 * _Constructs a red color._
	 */
	static red(): Color
	
	/**
	 * _Constructs a green color._
	 */
	static green(): Color
	
	/**
	 * _Constructs a blue color._
	 */
	static blue(): Color
	
	/**
	 * _Constructs a cyan color._
	 */
	static cyan(): Color
	
	/**
	 * _Constructs a yellow color._
	 */
	static yellow(): Color
	
	/**
	 * _Constructs a magenta color._
	 */
	static magenta(): Color
	
	/**
	 * _Constructs a orange color._
	 */
	static orange(): Color
	
	/**
	 * _Constructs a purple color._
	 */
	static purple(): Color
	
	/**
	 * _Constructs a brown color._
	 */
	static brown(): Color
	
	/**
	 * _Constructs a transparent color._
	 */
	static clear(): Color
	
	/**
	 * _Constructs a color._
	 * 
	 * Constructs a new color with a hex value and optionally an alpha value. The hex value may specify the alpha value but this will be ignored if the alpha value parameter is provided. Examples of valid hex values: #ff0000, #00ff0080 #00f and #ff. The pound sign is optional.
	 */
	constructor(hex: string, alpha: number)
}



/**
 * _Configuration the script runs with._
 * 
 * Contains information about the configuration the script is currently being run under.
 */
export interface config {
	/**
	 * Whether the script is running in the app.
	 */
	runsInApp: bool
	
	/**
	 * Whether the script is running in the action extension.
	 */
	runsInActionExtension: bool
	
	/**
	 * Whether the script is running with Siri.
	 */
	runsWithSiri: bool
	
	/**
	 * Whether the script is running in a notification.
	 */
	runsInNotification: bool
	
	/**
	 * Whether the script was run from the home screen. You can add a script to the home screen from the script settings.
	 */
	runsFromHomeScreen: bool
}



/**
 * _Adds messages to the log._
 * 
 * The console can be used to log information when running your script. The log may be useful when debugging your script, e.g. to examine values of variables.
 */
export interface console {
	/**
	 * _Logs a message to the console._
	 * 
	 * The message will have a default appearance. Refer to `console.error(message)` to log errors.
	 * 
	 * You can also use the global function `log(message)` which is a shorthand for `console.log`.
	 */
	static log(message: any)
	
	/**
	 * _Logs a warning message to the console._
	 * 
	 * The message will have a distinctive appearance. Refer to `console.log(message)` to log informative messages and `console.error(message)` to log errors.
	 * 
	 * You can also use the global function `logWarning(message)` which is a shorthand for `console.warn`.
	 */
	static warn(message: any)
	
	/**
	 * _Logs an error message to the console._
	 * 
	 * The message will have a distinctive appearance. Refer to `console.log(message)` to log informative message and `console.warn(message)` to log warnings.
	 * 
	 * You can also use the global function `logError(message)` which is a shorthand for `console.error`.
	 */
	static error(message: any)
	
	/**
	 * _Logs an error message to the console._
	 * 
	 * @deprecated Deprecated in version 1.3. Use console.error(message) instead.
	 * 
	 * The message will have a distinctive appearance. Refer to `console.log(message)` to log informative message and `console.warn(message)` to log warnings.
	 * 
	 * You can also use the global function `logError(message)` which is a shorthand for `console.error`.
	 */
	static logError(message: any)
}



export namespace Contact {
	declare interface EmailAddresses {
		"identifier": string,
		"label": string,
		"localizedLabel": string,
		"value": string
	}
	declare interface PhoneNumbers {
		"identifier": string,
		"label": string,
		"localizedLabel": string,
		"value": string
	}
	declare interface PostalAddresses {
		"identifier": string,
		"label": string,
		"localizedLabel": string,
		"street": string,
		"city": string,
		"state": string,
		"postalCode": string,
		"country": string
	}
	declare interface SocialProfiles {
		"identifier": string,
		"label": string,
		"localizedLabel": string,
		"service": string,
		"url": string,
		"userIdentifier": object,
		"username": string
	}
}

/**
 * _Contact in the address book._
 * 
 * The type represents a contact in the address book. You can use the type to fetch and update contacts in the address book. If you are signed into multiple accounts on the device, you may have multiple sources that populate the address book. A source is is represented as a `ContactsContainer`. A contact may be in only one container. A CardDAV account usually has a single container whereas an Exchange account may have multiple containers.
 */
export class Contact {
	/**
	 * _Uniquely identifies the contact on the device._
	 */
	identifier: string
	
	/**
	 * _Name prefix._
	 */
	namePrefix: string
	
	/**
	 * _Given name._
	 */
	givenName: string
	
	/**
	 * _Middle name._
	 */
	middleName: string
	
	/**
	 * _Family name._
	 */
	familyName: string
	
	/**
	 * _Nickname._
	 */
	nickname: string
	
	/**
	 * _Birthday._
	 */
	birthday: Date
	
	/**
	 * _Profile picture._
	 */
	image: Image
	
	/**
	 * _Email addresses._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "identifier": "UUID-ABC-123",
	 *       "label": "Home",
	 *       "localizedLabel": "Home",
	 *       "value": "my@example.com"
	 *     }
	 * 
	 * The identifier uniquely identifies the email address on this device. The label is a description of the email address and the value holds the email address itself.
	 */
	emailAddresses: Contact.EmailAddresses[]
	
	/**
	 * _Phone numbers._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "identifier": "UUID-ABC-123",
	 *       "label": "Home",
	 *       "localizedLabel": "Home",
	 *       "value": "(111)234-5678"
	 *     }
	 * 
	 * The identifier uniquely identifies the phone number on this device. The label is a description of the phone number and the value holds the phone number itself.
	 */
	phoneNumbers: Contact.PhoneNumbers[]
	
	/**
	 * _Postal addresses._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "identifier": "UUID-ABC-123",
	 *       "label": "Home",
	 *       "localizedLabel": "Home",
	 *       "street": "240  Terry Lane",
	 *       "city": "New York",
	 *       "state": "New York",
	 *       "postalCode": "10001",
	 *       "country": "United States of America"
	 *     }
	 * 
	 * The identifier uniquely identifies the phone number on this device. The label is a description of the phone number and the value holds the phone number itself.
	 */
	postalAddresses: Contact.PostalAddresses[]
	
	/**
	 * _Social profiles._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "identifier": "UUID-ABC-123",
	 *       "label": "Twitter",
	 *       "localizedLabel": "Twitter",
	 *       "service": "Twitter",
	 *       "url": "https://twitter.com/scriptableapp",
	 *       "userIdentifier": null,
	 *       "username": "scriptableapp"
	 *     }
	 * 
	 * The identifier uniquely identifies the social profile on this device. The label is a description of the social profile, the service is the social profile's service name, the URL contains a link to the social profile, the userIdentifier is the identifier of the social profile and the username is the name for the social profile.
	 */
	socialProfiles: {string: string}[]
	
	/**
	 * _Note for the contact._
	 */
	note: string
	
	/**
	 * _URL addresses._
	 */
	urlAddresses: string
	
	/**
	 * _Name of the organization associated with the contact._
	 */
	organizationName: string
	
	/**
	 * _Name of the department associated with the contact._
	 */
	departmentName: string
	
	/**
	 * _The contact's job title._
	 */
	jobTitle: string
	
	/**
	 * _Constructs a contact._
	 * 
	 * In order to add the contact to your address book, you must queue it for insertion using `Contact.add()`. When you're done making changes to the address book you should call `Contact.persistChanges()` to persist the changes.
	 */
	constructor()
	
	/**
	 * _Fetches contacts._
	 * 
	 * Fetches the contacts in the specified containers. A contact can be in only one container.
	 */
	static all(containers: ContactsContainer[]): Promise<Contact[]>
	
	/**
	 * _Fetches contacts in groups._
	 * 
	 * Fetches the contacts in the specified contacts groups. A contact may belong to many groups.
	 */
	static inGroups(groups: ContactsGroup[]): Promise<Contact[]>
	
	/**
	 * _Queues a contact to be added._
	 * 
	 * After you have created a contact, you must queue the contact to be added to the address book and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static add(contact: Contact, containerIdentifier: string)
	
	/**
	 * _Queues an update to a contact._
	 * 
	 * After you have updated one or more properties on a contact, you must queue the contact to be updated and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static update(contact: Contact)
	
	/**
	 * _Queues a contact to be deleted._
	 * 
	 * To delete a contact, you must queue the contact for deletion and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static delete(contact: Contact)
	
	/**
	 * _Persist queued changes to the address book._
	 * 
	 * Call this function to persist changes queued with `Contact.add()`, `Contact.update()` and `Contact.delete()`.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static persistChanges(): Promise
}



/**
 * _Collection of contacts._
 * 
 * If you're signed into multiple accounts on your device, you may have multiple contact containers. A contact can be in only one container. CardDAV accounts usually have a single container whereas Exchange accounts may have multiple containers. A container may have multiple groups. While a single contact can only belong to one container, a contact may belong to many groups.
 */
export class ContactsContainer {
	/**
	 * _Identifier of the contacts container._
	 */
	identifier: string
	
	/**
	 * _Name of the contacts container._
	 */
	name: string
	
	/**
	 * _Fetches default contacts container._
	 */
	static default(): Promise<ContactsContainer>
	
	/**
	 * _Fetches all contacts containers._
	 */
	static all(): Promise<ContactsContainer[]>
	
	/**
	 * _Fetches a contacts container._
	 */
	static withIdentifier(identifier: string): Promise<ContactsContainer>
}



/**
 * _Group of contacts._
 * 
 * A contacts container may have several groups of contacts. A contact can only belong to a single contacts container but may belong to zero or more contacts groups. For example, an iCloud account has only one container but may have many groups.
 */
export class ContactsGroup {
	/**
	 * _Identifier of the contacts group._
	 */
	identifier: string
	
	/**
	 * _Name of the contacts group._
	 */
	name: string
	
	/**
	 * _Constructs a contacts group._
	 * 
	 * In order to add the group to your address book, you must queue it for insertion using `Contact.add()`. When you're done making changes to the address book you should call `Contact.persistChanges()` to persist the changes.
	 */
	constructor()
	
	/**
	 * _Fetches contacts groups._
	 * 
	 * Fetches the contacts groups in the specified containers. A group can be in only one container.
	 */
	static all(containers: ContactsContainer[]): Promise<ContactsGroup[]>
	
	/**
	 * _Adds a contact to the group._
	 * 
	 * In order to persist the change, you should call `Contact.persistChanges()`. It is important that the contact is added to the address book. To add the contact to the address book, you should queue it for insertion using `Contact.add()` before persisting the changes.
	 */
	addMember(contact: Contact)
	
	/**
	 * _Removes a contact from the group._
	 * 
	 * In order to persist the change, you should call `Contact.persistChanges()`. It is important that the contact is added to the address book. To add the contact to the address book, you should queue it for insertion using `Contact.add()` before persisting the changes.
	 */
	removeMember(contact: Contact)
	
	/**
	 * _Queues a contacts group to be added._
	 * 
	 * After you have created a group, you must queue the group to be added to the address book and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static add(group: ContactsGroup, containerIdentifier: string)
	
	/**
	 * _Queues an update to a contacts group._
	 * 
	 * After you have updated one or more properties on a contacts group, you must queue the group to be updated and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static update(group: ContactsGroup)
	
	/**
	 * _Queues a contacts group to be deleted._
	 * 
	 * To delete a contacts group, you must queue the group for deletion and invoke `Contact.persistChanges()` to persist the changes to the address book.
	 * 
	 * For performance reasons, it is best to batch changes to the address book. Therefore you should queue all updates, insertions and removals of contacts and contacts groups to as large batches as possible and then call `Contact.persistChanges()` when you want to persist the changes to the address book.
	 */
	static delete(group: ContactsGroup)
}



/**
 * _Raw data representation._
 * 
 * Raw data representation of strings, files and images.
 */
export class Data {
	/**
	 * _Creates data from string._
	 * 
	 * The provided string is assumed to be UTF8 encoded. If the string is not UTF8 encoded, the function will return null.
	 */
	static fromString(string: string): Data
	
	/**
	 * _Reads data from file path._
	 * 
	 * Reads the raw data of the file at the specified file path.
	 */
	static fromFile(filePath: string): Data
	
	/**
	 * _Creates data from base 64 encoded string._
	 * 
	 * The supplied string must be base 64 encoded otherwise the function will return null.
	 */
	static fromBase64String(base64String: string): Data
	
	/**
	 * _Creates data from JPEG image._
	 */
	static fromJPEG(image: Image): Data
	
	/**
	 * _Creates data from PNG image._
	 */
	static fromPNG(image: Image): Data
	
	/**
	 * _Creates a string from the data._
	 * 
	 * The data is assumed to represent a UTF8 encoded string. If the string is not UTF8 encoded string, the function will return null.
	 */
	toRawString(): string
	
	/**
	 * _Creates a base 64 encoded string._
	 * 
	 * Creates a base 64 encoded string from the data.
	 */
	toBase64String(): string
	
	/**
	 * _Gets bytes from data._
	 */
	getBytes(): number[]
}



/**
 * _Presents a date picker._
 * 
 * Use the date picker to select a date. After configuring the date picker, call `pickTime()`, `pickDate()`, `pickDateAndTime()` or `pickCountDownTimer()` which will present the date picker modally. The `pickTime()`, `pickDate()` and `pickDateAndTime()` methods returns a promise that carries the selected date and the `pickCountDownTimer()` method retrns a promise that carries the selected duration.
 * 
 * The date picker can be configured towards picking a date with or without time, just a time or picking hours and minutes for a timer.
 */
export class DatePicker {
	/**
	 * _Minimum date that is selected in the picker._
	 * 
	 * The minimum date, along with the maximum date, specifies the valid date range. The minimum and maximum dates are ignored if the minimum date is greater than the maximum date. The dates are also ignored in countdown-timer mode.
	 */
	minimumDate: Date
	
	/**
	 * _Maximum date that is selected in the picker._
	 * 
	 * The maximum date, along with the minimum date, specifies the valid date range. The minimum and maximum dates are ignored if the minimum date is greater than the maximum date. The dates are also ignored in countdown-timer mode.
	 */
	maximumDate: Date
	
	/**
	 * _Countdown duration displayed by the date picker._
	 * 
	 * Use this property to get and set the duration of a countdown when calling the `pickCountDownDuration()` function to present the picker. The default value is zero and the maximum value is 23:59 (86,399 seconds).
	 */
	countdownDuration: number
	
	/**
	 * _Interval at which the date picker displays minutes._
	 * 
	 * Use the property to set the interval of the minute wheel. The default and minimum value is 1 and the maximum value is 30.
	 */
	minuteInterval: number
	
	/**
	 * _The initially selected date._
	 * 
	 * Use this property to specify the initially selected date and time when picking a date, a time or both using date picker. If no date is specified, the current date and time will be selected initially.
	 * 
	 * Be aware that this property does not hold the selected date after the date picker have been dismissed. The promises returned by `pickTime()`, `pickDate()` and `PickDateAndTime()` carries the selected date.
	 */
	initialDate: Date
	
	/**
	 * _Constructs a new date picker._
	 * 
	 * Use the date picker to present a view for selecting a date.
	 * 
	 * The date picker can be configured towards picking a date with or without time, just a time or picking hours and minutes for a timer.
	 */
	constructor()
	
	/**
	 * _Presents the date picker displaying hours and minutes._
	 * 
	 * Use the method to pick a time. The date picker will display hours and minutes and, depending on the locale of the device, an AM/PM designation.
	 * 
	 * The returned date will be the current date with the hour and minute set to the selected values. Use the `initialDate` property to set the initially selected date.
	 */
	pickTime(): Promise<Date>
	
	/**
	 * _Presents the date picker displaying day, month and year._
	 * 
	 * Use the method to pick a date. The date picker will display the a day, month and year. Use the `initialDate` property to set the initially selected date.
	 */
	pickDate(): Promise<Date>
	
	/**
	 * _Presents the date picker displaying date and time._
	 * 
	 * Use the method to pick a date and a time. The date picker will day, month, year, hour, minutes and, depending on the locale of the device, an AM/PM designation. Use the `initialDate` property to set the initially selected date.
	 */
	pickDateAndTime(): Promise<Date>
	
	/**
	 * _Presents the date picker for selecting the duration of a countdown._
	 * 
	 * Use the method to pick the duration of a countdown, e.g. a timer. The date picker will display hours and minutes. Use the `countdownDuration` property to set the initially selected duration.
	 */
	pickCountdownDuration(): Promise<number>
}



/**
 * _Provides information about the device._
 * 
 * Reads information about the current device and its screen.
 */
export class Device {
	/**
	 * _Name identifying the device._
	 * 
	 * You can find and edit the name of your device in the system settings.
	 */
	static name(): string
	
	/**
	 * _Name of the operating system:_
	 */
	static systemName(): string
	
	/**
	 * _Version of the operating system._
	 */
	static systemVersion(): string
	
	/**
	 * _Model of the device, e.g. "iPhone"._
	 */
	static model(): string
	
	/**
	 * _Whether the device is a phone._
	 * 
	 * You can use this property to choose behaviour of a script depending on whether its running on a phone or a pad.
	 */
	static isPhone(): bool
	
	/**
	 * _Whether the device is a pad._
	 * 
	 * You can use this property to choose behaviour of a script depending on whether its running on a phone or a pad.
	 */
	static isPad(): bool
	
	/**
	 * _Size of the screen._
	 * 
	 * The value is measured in points. For an explanation of the relationship between points and pixels, see the documentation of the `screenScale()` method. The value takes the device rotation into account, so the value will vary between portrait and landscape.
	 */
	static screenSize(): Size
	
	/**
	 * _Resolution of the screen._
	 * 
	 * The value is measured in pixels. The value does not take the rotation of the deviec into account.
	 */
	static screenResolution(): Size
	
	/**
	 * _Scale of the screen._
	 * 
	 * Standard resolution displays have a scale of 1.0 where one point on the screen equals one pixel. Retina displays will have a scale factor of 2.0 or 3.0 where one point on the screen is four or nine pixels, respectively.
	 */
	static screenScale(): number
	
	/**
	 * _Brightness of the screen in percentage._
	 * 
	 * The value range from 0 to 1. To set the screen brightness, refer to `setScreenBrightness()`
	 */
	static screenBrightness(): number
	
	/**
	 * _Whether the device is in portrait with the home button or home indicator at the bottom._
	 */
	static isInPortrait(): bool
	
	/**
	 * _Whether the device is in portrait but upside down with the home button or home indicator at the top._
	 */
	static isInPortraitUpsideDown(): bool
	
	/**
	 * _Whether the device is in landscape with the home button or home indicator on the right side._
	 */
	static isInLandscapeLeft(): bool
	
	/**
	 * _Whether the device is in landscape with the home button or home indicator on the left side._
	 */
	static isInLandscapeRight(): bool
	
	/**
	 * _Whether the device is lying parallel to the ground with the screen facing upwards._
	 */
	static isFaceUp(): bool
	
	/**
	 * _Whether the device is lying parallel to the ground with the screen facing downwards._
	 */
	static isFaceDown(): bool
	
	/**
	 * _Current battery level._
	 * 
	 * The value is in percentage ranging between 0 and 1.
	 */
	static batteryLevel(): number
	
	/**
	 * _Whether the device is being not plugged into power and thus discharging._
	 */
	static isDischarging(): bool
	
	/**
	 * _Whether the device is being charged._
	 */
	static isCharging(): bool
	
	/**
	 * _Whether the device is fully charged._
	 */
	static isFullyCharged(): bool
	
	/**
	 * _The preferred langauges._
	 * 
	 * The list is ordered according to the language preferences specified in the system settings.
	 */
	static preferredLanguages(): string[]
	
	/**
	 * _Identifier for the device locale._
	 */
	static locale(): string
	
	/**
	 * _Identifier for the device language._
	 */
	static language(): string
	
	/**
	 * _Sets the brightness of the screen._
	 * 
	 * The value range from 0 to 1. To set the screen brightness, refer to `setScreenBrightness()`
	 */
	static setScreenBrightness(percentage: number)
}



/**
 * _Presents an interface for dictation._
 * 
 * Presents an interface that lets you dictate a text. You can specify the locale of the text you want to dictate when calling the start() function. Dictation must manually be stopped from the presented interface when you are finished dictating.
 */
export class Dictation {
	/**
	 * _Starts dictation._
	 * 
	 * Presents an interface that shows the dictated string. Press "Done" when you are done dictating the text.
	 */
	static start(locale: string): Promise<string>
}



/**
 * _Presents a document picker._
 * 
 * Use this to present a picker that allows opening a document from Files app or exporting a document to Files app. When opening a document, the picker will prompt you to select one or more documents after which you will get the path for the documents. Use the FileManager to read the content of these files. When exporting a document, the picker will ask you to select a destination to store the document.
 */
export class DocumentPicker {
	/**
	 * _Opens a document._
	 * 
	 * Presents a picker that promps for opening a document from the Files app. When fulfilled the returned promise will provide the paths for the selected documents. Use an instance of FileManager to read the contents of the files.
	 */
	static open(types: string[]): Promise<string[]>
	
	/**
	 * _Exports a file to a document._
	 * 
	 * Exports the file to a document with. A picker prompting for a destination to export the document to is presented.
	 */
	static export(path: string): Promise<string[]>
	
	/**
	 * _Exports a string to a document._
	 * 
	 * Exports a string to a new file. The name of the file can optionally be specified. A picker prompting for a destination to export the document to is presented.
	 */
	static exportString(content: string, name: string): Promise<string[]>
	
	/**
	 * _Exports an image._
	 * 
	 * Exports an image to a new file. The name of the file can optionally be specified. A picker prompting for a destination to export the document to is presented.
	 */
	static exportImage(image: Image, name: string): Promise<string[]>
}



/**
 * _Context for drawing images._
 * 
 * An instance of DrawContext is a canvas on which you can draw an image using shapes, texts and other images. You must specify the size of your canvas by setting the size property. In order to start drawing your image, you must call beginDrawing(). At any point after beginning your drawing and before ending your drawing can you call getImage() to get an image object of your drawing. When you are done drawing your image, you should call endDrawing().
 */
export class DrawContext {
	/**
	 * _Size of canvas._
	 * 
	 * Specifies the size of the canvas on which you are drawing. The image returned by getImage() will have this exact size, except if respectScreenScale is true.
	 */
	size: Size
	
	/**
	 * _Enable to respect the scale of the screen._
	 * 
	 * Devices have a screen scale that is used to convert between the logical coordinate space and the device coordinate space. For example, retina screens have a screen scale of 2 or 3 meaning that one point in the logical coordinate space is represented by four or nine pixels. Respecting the screen scale will multiply the specified size of the canvas by the screen scale. For example a canvas of size 200 by 200 will be 600 by 600 when the image is rendered on a retina screen with a screen scale of 3. When respecting the screen scale is disabled, you may experience that your images looks blurry because essentially the size you have specified will be stretched when rendered on the screen. Default is false.
	 */
	respectScreenScale: bool
	
	/**
	 * _Determines whether the context is opaque._
	 * 
	 * When enabled your image will be rendered opaque. Default is true.
	 */
	opaque: bool
	
	/**
	 * _Constructs a canvas to draw on._
	 * 
	 * Constructs a new canvas to draw images, shapes and texts on. Before drawing to the context, beginDrawing() should be called.
	 */
	constructor()
	
	/**
	 * _Retrieves the image._
	 * 
	 * Call this to retrieve the image you have drawn to the context. Note that this should be called before calling endDrawing().
	 */
	getImage(): Image
	
	/**
	 * _Draws an image in the specified rect._
	 * 
	 * Draws the image in the rectangle. The image will be scaled to fit within the rectangle.
	 */
	drawImageInRect(image: Image, rect: Rect)
	
	/**
	 * _Draws an image at the specified point._
	 * 
	 * Draws the image at the point. The top-left corner of the image will be drawn at the specified point.
	 */
	drawImageAtPoint(image: Image, point: Point)
	
	/**
	 * _Sets the fill color._
	 * 
	 * Sets the fill color to be used when performing a fill operation. Any fill operation performed afterwards will fill with the specified color until another call to setFillColor is made.
	 */
	setFillColor(color: Color)
	
	/**
	 * _Sets the stroke color._
	 * 
	 * Sets the stroke color to be used when performing a stroke operation. Any stroke operation performed afterwards will stroke with the specified color until another call to setStrokeColor is made.
	 */
	setStrokeColor(color: Color)
	
	/**
	 * _Sets the line width for stroking._
	 * 
	 * Sets the line width to be used when performing a stroke operation.
	 */
	setLineWidth(width: number)
	
	/**
	 * _Fills a rectangle._
	 * 
	 * Fills the rectangle width the color set when calling setFillColor.
	 */
	fill(rect: Rect)
	
	/**
	 * _Fills a rectangle._
	 * 
	 * Fills the rectangle width the color set when calling setFillColor.
	 */
	fillRect(rect: Rect)
	
	/**
	 * _Fills an ellipse._
	 * 
	 * Fills the ellipse that fits within the supplied rectangle with the color set when calling setFillColor.
	 */
	fillEllipse(rect: Rect)
	
	/**
	 * _Strokes a rectangle._
	 * 
	 * Draws a line around the rectangle using the color set when calling setStrokeColor. The line will have the width set when calling setLineWidth.
	 */
	stroke(rect: Rect)
	
	/**
	 * _Strokes a rectangle._
	 * 
	 * Draws a line around the rectangle using the color set when calling setStrokeColor. The line will have the width set when calling setLineWidth.
	 */
	strokeRect(rect: Rect)
	
	/**
	 * _Strokes a rectangle._
	 * 
	 * Draws a line around the ellipse that fits within the supplied rectangle. The line will have the color set when calling setStrokeColor and the width set when calling setLineWidth.
	 */
	strokeEllipse(rect: Rect)
	
	/**
	 * _Adds a path to the context._
	 * 
	 * After adding a path to the context, the path can be stroked or filled by calling strokePath and fillPath. Note that only the path that was added latest will be affected by calls to strokePath and fillPath.
	 */
	addPath(path: Path)
	
	/**
	 * _Strokes the path that was added the latest._
	 * 
	 * The path that was latest added to the context is stroked with the color set using setStrokeColor and the line widht set using setLineWidth.
	 */
	strokePath()
	
	/**
	 * _Fills the path that was added the latest._
	 * 
	 * The path that was latest added to the context is filles with the color set using setFillColor.
	 */
	fillPath()
	
	/**
	 * _Draws text at a position._
	 * 
	 * Call this to draw a text string to the context. The top-left of the text will be drawn at the specified position.
	 */
	drawText(text: string, pos: Point)
	
	/**
	 * _Draws text in a rectangle._
	 * 
	 * Call this to draw a text string in a rectangle. Specify how the text should be aligned within the rectangle by calling setTextAlignedLeft, setTextAlignedCenter or setTextAlignedRight before drawing the text.
	 */
	drawTextInRect(text: string, rect: Rect)
	
	/**
	 * _Sets the font size used when drawing text._
	 * 
	 * Sets the font size to be used when drawing text strings to the context.
	 */
	setFontSize(size: number)
	
	/**
	 * _Sets the text color used when drawing text._
	 * 
	 * Sets the text color to be used when drawing text strings to the context.
	 */
	setTextColor(color: Color)
	
	/**
	 * _Specifies that texts should be left aligned._
	 * 
	 * Sets text alignment to left. Texts drawn after calling this will be left aligned inside the provided rectangle.
	 */
	setTextAlignedLeft()
	
	/**
	 * _Specifies that texts should be center aligned._
	 * 
	 * Sets text alignment to center. Texts drawn after calling this will be center aligned inside the provided rectangle.
	 */
	setTextAlignedCenter()
	
	/**
	 * _Specifies that texts should be right aligned._
	 * 
	 * Sets text alignment to right. Texts drawn after calling this will be right aligned inside the provided rectangle.
	 */
	setTextAlignedRight()
}



/**
 * _Read and write files on disk._
 * 
 * A FileManager lets you read files stored on the disk and make changes to them. Paths to files are supplied as strings.
 */
export class FileManager {
	/**
	 * _Creates a local FileManager._
	 * 
	 * Creates a file manager for operating with files stored locally.
	 */
	static local(): FileManager
	
	/**
	 * _Creates an iCloud FileManager._
	 * 
	 * Creates a file manager for operating with files stored in iCloud. iCloud must be enabled on the device in order to use this.
	 */
	static iCloud(): FileManager
	
	/**
	 * _Read contents of a file as data._
	 * 
	 * Reads the contents of the file specified by the file path as raw data. To read the file as a string see `readString(filePath)` and to read it as an image see `readImage(filePath)`.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	read(filePath: string): Data
	
	/**
	 * _Read contents of a file as string._
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	readString(filePath: string): string
	
	/**
	 * _Read contents of a file as an image._
	 * 
	 * Reads the contents of the file specified by the file path and convert it to an image.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	readImage(filePath: string): Image
	
	/**
	 * _Write data to a file._
	 */
	write(filePath: string, content: Data)
	
	/**
	 * _Write a string to a file._
	 * 
	 * Writes the content to the specified file path on disk. If the file does not already exist, it will be created. If the file already exists the contents of the file will be overwritten with the new content.
	 */
	writeString(filePath: string, content: string)
	
	/**
	 * _Write an image to a file._
	 * 
	 * Writes the image to the specified file path on disk. If the file does not already exist, it will be created. If the file already exists the contents of the file will be overwritten with the new content.
	 */
	writeImage(filePath: string, image: Image)
	
	/**
	 * _Removes a file._
	 * 
	 * Removes the file at the specified path. Use with caution. Removed files cannot be restored.
	 */
	remove(filePath: string)
	
	/**
	 * _Moves a file._
	 * 
	 * Moves the file from the source path to the destination path. Caution: This operation will replace any existing file at the the destination.
	 */
	move(sourceFilePath: string, destinationFilePath: string)
	
	/**
	 * _Copies a file._
	 * 
	 * Copies the file from the source path to the destination path. Caution: This operation will replace any existing file at the the destination.
	 */
	copy(sourceFilePath: string, destinationFilePath: string)
	
	/**
	 * _Checks if a file exists._
	 * 
	 * Checks if the file exists at the specified file path. Checking this before moving or copying to a destination can be a good idea as those operations will replace any existing file at the destination file path.
	 */
	fileExists(filePath: string): bool
	
	/**
	 * _Checks if a path points to a directory._
	 */
	isDirectory(path: string): bool
	
	/**
	 * _Creates a directory at the specified path._
	 * 
	 * You can optionally create all intermediate directories.
	 */
	createDirectory(path: string, intermediateDirectories: bool)
	
	/**
	 * _Path of temporary directory._
	 * 
	 * Used to retrieve the path of a temporary directory on disk. The operating system may at anytime delete files stored in this directory and therefore you should not rely on it for long time storage. If you need long time storage, see documentsDirectory() or libraryDirectory(). This directory is not shared between the app, the action extension and Siri.
	 */
	temporaryDirectory(): string
	
	/**
	 * _Path of documents directory._
	 * 
	 * Used to retrieve the path to the documents directory. Your scripts are stored in this directory. If you have iCloud enabled, your scripts will be stored in the documents directory in iCloud otherwise they will be stored in the local documents directory. The directory can be used for long time storage. Documents stored in this directory can be accessed using the Files app. Note that files stored in the local documents directory will not appear in the Files app unless you enable the "Scriptable Local" file provider. Visit the Files app to enable the file provider.
	 */
	documentsDirectory(): string
	
	/**
	 * _Path of library directory._
	 * 
	 * Used to retrieve the path to the documents directory. The directory can be used for long time storage. Documents stored in this directory cannot be accessed using the Files app.
	 */
	libraryDirectory(): string
	
	/**
	 * _Joins two path components._
	 * 
	 * Joins two paths to created one path. For example to join the path to a directory with the name of a file. This is the suggested approach for creating new file paths passed to the read and write functions of a FileManager.
	 */
	joinPath(lhsPath: string, rhsPath: string): string
	
	/**
	 * _Reads all tags from a file._
	 * 
	 * The tags are written from the file at the specified path. Tags can either be read added and removed using the Files app or using the APIs provided by a FileManager.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	allTags(filePath: string): string[]
	
	/**
	 * _Adds a tag to a file._
	 * 
	 * A tag can only be added to a file once. It is not possible to specify a color for the tag. You can create the tags using the Files app to specify the color and the add them to files afterwards using the FileManager API.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	addTag(filePath: string, tag: string)
	
	/**
	 * _Removes a tag from a file._
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	removeTag(filePath: string, tag: string)
	
	/**
	 * _Reads an extended attribute from a file._
	 * 
	 * Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
	 * 
	 * The function will return `null` if the attribute does not exist.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	readExtendedAttribute(filePath: string, name: string): string
	
	/**
	 * _Writes an extended attribute to a file._
	 * 
	 * Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	writeExtendedAttribute(filePath: string, value: string, name: string)
	
	/**
	 * _Removes an extended attribute from a file._
	 * 
	 * Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
	 * 
	 * The function will error if the file does not exist or if it exists in iCloud but have not been download. Use `fileExists(filePath)` to check if a file exists and `downloadFileFromiCloud(filePath)` to download the file. Note that it is always safe to call `downloadFileFromiCloud(filePath)`, even if the file is stored locally on the device.
	 */
	removeExtendedAttribute(filePath: string, name: string)
	
	/**
	 * _Reads all extended attributes on a file._
	 * 
	 * Extended attributes are metadata that can be stored on a file. Note that extended attributes are not synced with iCloud.
	 */
	allExtendedAttributes(filePath: string): string[]
	
	/**
	 * _Gets the UTI of the specified file._
	 * 
	 * The Uniform Type Identifier is a string that identifies the type of file.
	 */
	getUTI(filePath: string): string
	
	/**
	 * _Lists content of directory._
	 * 
	 * Lists all the contents in the specified directory. The returned array contains file paths to all files in the directory.
	 */
	listContents(directoryPath: string): string[]
	
	/**
	 * _Get name of a file._
	 * 
	 * Takes a file path and returns the name of the file. Also supports getting the name of a directory. The returned file name optionally includes the extension of the file.
	 */
	fileName(filePath: string, includeFileExtension: bool): string
	
	/**
	 * _Get extension of a file._
	 * 
	 * Takes a file path and returns the extension of the file, e.g. ".jpg" or ".js". Returns en empty string for directories.
	 */
	fileExtension(filePath: string): string
	
	/**
	 * _Get path to a bookmarked file or folder._
	 * 
	 * Gets the path to a bookmarked file or filder. Use file bookmarks to access files and folders outside Scriptables documents directory.
	 * 
	 * You can edit your file bookmarks from Scriptables settings.
	 * 
	 * The function will throw an error if no bookmark exists.
	 * 
	 * Please be aware that bookmarks can only be used in the app. All APIs that relate to bookmarks will always throw an error when used in Siri or in a script run from the Share Sheet.
	 */
	bookmarkedPath(name: string): string
	
	/**
	 * _Check if a bookmark exists._
	 * 
	 * Checks if a file bookmark exists with the specified name.
	 * 
	 * You can edit your file bookmarks from Scriptables settings.
	 * 
	 * Please be aware that bookmarks can only be used in the app. All APIs that relate to bookmarks will always throw an error when used in Siri or in a script run from the Share Sheet.
	 */
	bookmarkExists(name: string): bool
	
	/**
	 * _Download file from iCloud if necessary._
	 * 
	 * Downloads the file from iCloud if it have not already been downloaded. If you pass in a path to a file that is not stored in iCloud, the returned will be resolved immediately making it safe to pass in any file path.
	 */
	downloadFileFromiCloud(filePath: string): Promise
	
	/**
	 * _Checks if a file is stored in iCloud._
	 * 
	 * Checks if a file is stored in iCloud or locally on the device. The function returns false if the file does not exist. Check if a file exists using `fileExists(filePath)`
	 */
	isFileStoredIniCloud(filePath: string): bool
	
	/**
	 * _Checks if a file have been downloaded._
	 * 
	 * If a file is stored in iCloud and have not been downloaded, this function returns false. In that case, the file can be downloaded using `downloadFileFromiCloud(filePath`. If the file is not stored in iCloud but rather locally on the device, this function returns true.
	 * 
	 * The function returns false if the file does not exist. Check if a file exists using `fileExists(filePath)`
	 */
	isFileDownloaded(filePath: string): bool
}



/**
 * _Manages image data._
 * 
 * Images objects contains image data. APIs in Scriptable that work with images, either by taking an image as input or returning an image, will use this the Image type.
 */
export class Image {
	/**
	 * _Size of the image in pixels._
	 */
	size: Size
	
	/**
	 * _Creates image from file._
	 * 
	 * Loads an image from the specified file path. If the image could not be read, the function will return null.
	 */
	static fromFile(filePath: string): Image
	
	/**
	 * _Creates image from raw data._
	 * 
	 * Loads an image from the raw data. If the image could not be read, the function will return null.
	 */
	static fromData(data: Data): Image
}



/**
 * _Imports module with specified name._
 * 
 * Modules are imported by specifying the name of the file. For example, to import the file `foo.js`, call `importModule('foo')`. Including the file extension is optional. Scriptable will look for modules in the following directories, in order:
 * 
 * You can specify a file path rather than the name of a file e.g. `importModule('/lib/foo')`. If the path points to a directory, Scriptable will look for a file named `index.js` in the directory.
 * 
 * The `importModule` function returns `module.exports` of the imported module.
 * 
 * Consider the following file.
 * 
 *     let circle = importModule('circle')
 *     let r = 2
 *     let area = circle.area(r)
 *     log('Area of circle: ' + area)
 * 
 * The file imports the module `circle.js` which has the following contents.
 * 
 *     module.exports.area = (r) => {
 *       return Math.PI * Math.pow(r, 2)
 *     }
 *     
 *     module.exports.circumference = (r) => {
 *       return 2 * Math.PI * r
 *     }
 * 
 * The `circle.js` module exports the functions `area` and `circumference`.
 * 
 * For more information about modules, refer to the documentation on the `module` variable.
 */
export function importModule(name: string)


/**
 * _Secure storage for credentials._
 * 
 * The keychain is a secure storage for credentials, keys etc. Use the `set()` method to add values to the keychain. You can then later use the `get()` method to retrieve the value.
 */
export class Keychain {
	/**
	 * _Check if keychain contains a key._
	 * 
	 * Checks if the keychain contains the specified key.
	 */
	static contains(key: string): bool
	
	/**
	 * _Add value for a specified key to keychain._
	 * 
	 * Adds the the value to the keychain, assigning it to the specified key. If the key already exists in the keychain, the value is overwritten.
	 * 
	 * Values are securely stored in an encrypted database.
	 */
	static set(key: string, value: string)
	
	/**
	 * _Reads a value from the keychain._
	 * 
	 * Reads the value for the specified key. If the key doesn't exist the method will throw an error. Used the `contains` method to check if a key exists in the keychain.
	 */
	static get(key: string): string
	
	/**
	 * _Remove key from keychain._
	 */
	static remove(key: string)
}



/**
 * _Fetches your location._
 * 
 * Uses GPS, WiFi and cellular hardware to determine your location. The first time you use the API, the application will prompt you to authorize access to your location. If you do not authorize access, the application cannot fetch your location. You can change this later from the system settings.
 */
export class Location {
	/**
	 * _Fetches your location._
	 * 
	 * Your location is fetched using GPS, WiFi and cellular hardware. The object carried by the promise includes the latitude, longitude and altitude as well as the horizontal and vertical accuracy measured in meters.
	 */
	static current(): Promise<{string: number}>
	
	/**
	 * _Uses best accuracy. This is default._
	 * 
	 * Set this when you want to achieve the best possible accuracy when retrieving your location. This is the default accuracy.
	 */
	static setAccuracyToBest()
	
	/**
	 * _Sets accuracy to within ten meters._
	 */
	static setAccuracyToTenMeters()
	
	/**
	 * _Sets accuracy to within hundred meters._
	 */
	static setAccuracyToHundredMeters()
	
	/**
	 * _Sets accuracy to within one kilometer._
	 */
	static setAccuracyToKilometer()
	
	/**
	 * _Sets accuracy to within three kilometersb._
	 */
	static setAccuracyToThreeKilometers()
	
	/**
	 * _Performs reverse-geocoding for a location._
	 * 
	 * A reverse-geocoding request fetches information about the current location. The data is delivered by Apples geocoding service.
	 */
	static reverseGeocode(latitude: number, longitude: number, locale: string): {string: any}[]
}



/**
 * _Sends a mail._
 * 
 * Presents UI for sending a mail.
 */
export class Mail {
	/**
	 * _Recipients of the mail._
	 * 
	 * Array of recipients to send the mail to. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
	 */
	toRecipients: string[]
	
	/**
	 * _Recipients to set CC on the mail._
	 * 
	 * Array of recipients to set as CC on the mail. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
	 */
	ccRecipients: string[]
	
	/**
	 * _Recipients to set BCC on the mail._
	 * 
	 * Array of recipients to set as BCC on the mail. Elements in the array should be e-mail addresses. You will have a chance to modify this before the mail is sent.
	 */
	bccRecipients: string[]
	
	/**
	 * _Subject of the mail._
	 * 
	 * Subject of the mail to send.\\You will have a chance to modify this before the mail is sent.
	 */
	subject: string
	
	/**
	 * _Body of the mail._
	 * 
	 * Body of the mail to send.\\You will have a chance to modify this before the mail is sent.
	 */
	body: string
	
	/**
	 * _Whether body is HTML._
	 * 
	 * Set to true if the body of the mail is HTML. Defaults to false.
	 */
	isBodyHTML: bool
	
	/**
	 * _Preferred email address to use in the from field._
	 * 
	 * Sets the preferred email addressed to use when sending the mail. If no account with the preferred email address is set up, the default email address is used.
	 */
	preferredSendingEmailAddress: string
	
	/**
	 * _Constructs a mail._
	 * 
	 * Constructs a mail to be sent either as a text message or an iMessage.
	 */
	constructor()
	
	/**
	 * _Send the mail._
	 * 
	 * Presents a screen from which the mail can be sent. The mail will not be sent until you have confirmed it from the presented screen.
	 */
	send(): Promise
	
	/**
	 * _Adds an image attachment to the mail._
	 */
	addImageAttachment(image: Image)
	
	/**
	 * _Adds a file attachment to the mail._
	 */
	addFileAttachment(filePath: string)
	
	/**
	 * _Adds a data attachment to the mail._
	 * 
	 * When adding a data attachment to the mail, you are responsible for providing a valid MIME type and filename. It is advised to use `addImageAttachment` and `addFileAttachment` whenever possible.
	 */
	addDataAttachment(data: Data, mimeType: string, filename: string)
}



/**
 * _Sends a message._
 * 
 * Presents UI for sending a message.
 */
export class Message {
	/**
	 * _Recipients of the message._
	 * 
	 * Array of recipients to send the message to. Elements in the array should be phone numbers. You will have a chance to modify this before the message is sent.
	 */
	recipients: string[]
	
	/**
	 * _Body of the message._
	 * 
	 * Body of the message to send.\\You will have a chance to modify this before the message is sent.
	 */
	body: string
	
	/**
	 * _Constructs a message._
	 * 
	 * Constructs a message to be sent either as a text message or an iMessage.
	 */
	constructor()
	
	/**
	 * _Send the message._
	 * 
	 * Presents a screen from which the message can be sent. The message will not be sent until you have confirmed it from the presented screen.
	 */
	send(): Promise
	
	/**
	 * _Adds an image attachment to the message._
	 */
	addImageAttachment(image: Image)
	
	/**
	 * _Adds a file attachment to the message._
	 */
	addFileAttachment(filePath: string)
	
	/**
	 * _Adds a data attachment to the message._
	 * 
	 * When adding a data attachment to the message, you are responsible for providing a valid Uniform Type Identifier and filename. It is advised to use `addImageAttachment` and `addFileAttachment` whenever possible.
	 */
	addDataAttachment(data: Data, uti: string, filename: string)
}



/**
 * _The current module._
 * 
 * Scriptable treats each file as a module. Consider the following file.
 * 
 *     let circle = importModule('circle')
 *     let r = 2
 *     let area = circle.area(r)
 *     log('Area of circle: ' + area)
 * 
 * The file imports the module `circle.js` which has the following contents.
 * 
 *     module.exports.area = (r) => {
 *       return Math.PI * Math.pow(r, 2)
 *     }
 *     
 *     module.exports.circumference = (r) => {
 *       return 2 * Math.PI * r
 *     }
 * 
 * The `circle.js` module exports the functions `area` and `circumference`. You can add any function or object to the `exports` of a module to make them available when the module is imported with `importModule`.
 */
export interface module {
	/**
	 * _Path to file containing the module._
	 * 
	 * This is the absolute path to the file containing the module.
	 */
	filename: string
	
	/**
	 * _Exported functions and modules._
	 * 
	 * Values assigned to the `exports` are returned by the global `importModule` function when the module is imported.
	 * 
	 * `exports` can be of any type but by default it is an empty object. Consider the following example which exports the `area` and `circumference` functions.
	 * 
	 *     module.exports.area = (r) => {
	 *       return Math.PI * Math.pow(r, 2)
	 *     }
	 *     
	 *     module.exports.circumference = (r) => {
	 *       return 2 * Math.PI * r
	 *     }
	 * 
	 * Alternatively if you only need to export a single function or object, you can assign directly to the `exports` property as shown in the following examples.
	 * 
	 *     module.exports = (r) => {
	 *       return 2 * Math.PI * r
	 *     }
	 * 
	 * `module.exports = "My string"`
	 */
	exports: any
}



export namespace Notification {
	declare interface Actions {
		"title": string,
		"url": string
	}
}

/**
 * _Schedules and manages notifications._
 * 
 * Notifications are scheduled for delivery at some point in the future. A notification may be delivered even when Scriptable is not running.
 */
export class Notification {
	/**
	 * _Identifier of the notification._
	 * 
	 * To reschedule a notification, use the identifier of an existing notification.
	 */
	identifier: string
	
	/**
	 * _Title of the notification._
	 */
	title: string
	
	/**
	 * _Subtitle of the notification._
	 */
	subtitle: string
	
	/**
	 * _Body of the notification._
	 */
	body: string
	
	/**
	 * _Preferred height of the notification._
	 * 
	 * By default Scriptable attempts to determine an appropriate height for your notification. If you want to override the default behaviour, you can specify a preferred content height. The preferred content height is only used when running a script inside the notification, i.e. when `scriptName` is not null. iOS may limit the height of the notification in which case the preferred content height is not guaranteed to be respected.
	 */
	preferredContentHeight: number
	
	/**
	 * _Number to display in the app icon's badge._
	 * 
	 * When the number is zero, no badge is displayed. When the number is greater than zero, the number is displayed in the app icon's badge. Setting the value to null, will leave the badge unchanged. The default value is null.
	 */
	badge: number
	
	/**
	 * _Identifier for grouping the notification._
	 * 
	 * Notifications are grouped by the identifier on the Home screen and in the Notification Center.
	 */
	threadIdentifier: string
	
	/**
	 * _Custom information._
	 * 
	 * Store any custom information for the information. This can be accessed from the `Notification.opened` property when a script is run from a notification.
	 */
	userInfo: {string: any}
	
	/**
	 * _Sound of the notification._
	 * 
	 * Set to null if you do not want any sound. Set to one of the following values if you want a sound.
	 * 
	 * *   default
	 * *   accept
	 * *   alert
	 * *   complete
	 * *   event
	 * *   failure
	 * *   piano\_error
	 * *   piano\_success
	 * *   popup
	 * 
	 * By default the notification is delivered with no sound.
	 */
	sound: string
	
	/**
	 * _URL to open when notification is tapped._
	 * 
	 * The Scriptable application will open the URL when the notification is tapped. This can be a URL that uses Scriptables URL scheme, the URL scheme of another application or a website URL.
	 */
	openURL: string
	
	/**
	 * _Delivery date of the notification._
	 * 
	 * If the notification have already been delivered, for example because it was fetched using `Notification.allDelivered()`, the deliveryDate will be populated. Otherwise it will be null.
	 * 
	 * The property cannot be set. In order to specify a future delivery date for a notification, see the `setTriggerDate` function. For recurring notifications, see the `setDailyTrigger` and `setWeeklyTrigger` functions.
	 */
	deliveryDate: Date
	
	/**
	 * _Next trigger date of the notification._
	 * 
	 * The next trigger date is the point in time where the next notification will be delivered.
	 * 
	 * The property cannot be set. In order to specify a future delivery date for a notification, see the `setTriggerDate` function. For recurring notifications, see the `setDailyTrigger` and `setWeeklyTrigger` functions.
	 */
	nextTriggerDate: Date
	
	/**
	 * _Name of script to run in rich notification._
	 * 
	 * When notification is force touched or long pressed, Scriptable can run a script inside the notification without opening the app. Set the `scriptName` to a name of an existing script to run it inside the notification.
	 */
	scriptName: string
	
	/**
	 * _Actions added to the notification._
	 * 
	 * An array of objects on the following form:
	 * 
	 *     {
	 *       "title": "Open Website",
	 *       "url": "https://scriptable.app"
	 *     }
	 * 
	 * To add a notification, use `Notification.addAction`.
	 */
	actions: Notification.Actions
	
	/**
	 * _Notification a script is running in._
	 * 
	 * @deprecated Deprecated in version 1.3. Use args.notification instead.
	 * 
	 * The notification that a script is being run in or the application was opened from.
	 * 
	 * The notification contains all information that was set when the notification was originally scheduled, including the `userInfo` property which can be used to contain custom data that might be relevant when running the script.
	 */
	static current(): Notification
	
	/**
	 * _Constructs a notification._
	 */
	constructor()
	
	/**
	 * _Schedules the notification._
	 * 
	 * When a new notification is constructed, it must be scheduled, otherwise it will not be delivered. If an existing notification is modified, it must also be scheduled again for the changes to take effect.
	 */
	schedule(): Promise
	
	/**
	 * _Removes the notification._
	 * 
	 * Removes all future triggers of the notification.
	 */
	remove(): Promise
	
	/**
	 * _Sets the notification to be triggered on a date and time._
	 */
	setTriggerDate(date: Date)
	
	/**
	 * _Sets the notification to be triggered daily._
	 * 
	 * Sets the notification to be triggered on a specific time of the day. When the notification repeats, it will be sent at the same time on all future days. If the notification is not repating it will be sent on the next occurrence of the specified time.
	 */
	setDailyTrigger(hour: number, minute: number, repeats: bool)
	
	/**
	 * _Sets the notification to be triggered weekly._
	 * 
	 * Sets the notification to be triggered on a specific day of the week and a specific time of that day. When the notification repeats, it will be sent at the same time on all future days. If the notification is not repating it will be sent on the next occurrence of the specified time.
	 */
	setWeeklyTrigger(weekday: number, hour: number, minute: number, repeats: bool)
	
	/**
	 * _Adds an action button._
	 * 
	 * Actions are shown as buttons in the notification. When screen space is unlimited, the system shows up to 10 actions. When the space is limited the system shows at most two actions.
	 */
	addAction(title: string, url: string, destructive: bool)
	
	/**
	 * _All pending notifications._
	 * 
	 * Fetches all notifications that have been scheduled from Scriptable and are waiting to be delivered.
	 */
	static allPending(): Promise<Notification[]>
	
	/**
	 * _Delivered notifications displayed in the Notification Center._
	 * 
	 * Fetches all notifications that have been scheduled from Scriptable and that are still displayed in the Notification Center of iOS.
	 */
	static allDelivered(): Promise<Notification[]>
	
	/**
	 * _Removes all pending notifications._
	 * 
	 * Removes all notifications that have been scheduled from Scriptable and are waiting to be delivered.
	 * 
	 * Use with caution. This removes all notifications scheduled across all of your scripts and the action cannot be undone.
	 */
	static removeAllPending(): Promise
	
	/**
	 * _Removes all delivered notifications._
	 * 
	 * Removes all notifications that have been scheduled from Scriptable and that are still displayed in the Notification Center of iOS.
	 */
	static removeAllDelivered(): Promise
	
	/**
	 * _Removes pending notifications._
	 * 
	 * Removes notifications with the specified identifiers. The notifications are only removed if they are pending, that is they have been scheduled and are waiting to be delivered. To remove delivered notifications, see `Notification.removeDelivered()`.
	 */
	static removePending(identifiers: string[]): Promise
	
	/**
	 * _Removes delivered notifications._
	 * 
	 * Removes notifications with the specified identifiers. The notifications are only removed if they have been delivered. To remove pending notifications, see `Notification.removePending()`.
	 */
	static removeDelivered(identifiers: string[]): Promise
	
	/**
	 * _Resets the current notification._
	 * 
	 * Effectively sets `args.notification` to null.
	 * 
	 * When a notification scheduled from Scriptable have been tapped to open the app or while the app was open, `args.notification` will have a value until Scriptable is quit. You can manually reset the value using `Notification.resetCurrent`.
	 */
	static resetCurrent()
}



/**
 * _Copy and paste strings or images._
 * 
 * Copy and paste strings and images to and from the pasteboard.
 */
export class Pasteboard {
	/**
	 * _Copies a string to the pasteboard._
	 */
	static copy(string: string)
	
	/**
	 * _Pastes a string from the pasteboard._
	 */
	static paste(): string
	
	/**
	 * _Copies a string to the pasteboard._
	 */
	static copyString(string: string)
	
	/**
	 * _Pastes a string from the pasteboard._
	 */
	static pasteString(): string
	
	/**
	 * _Copies an image to the pasteboard._
	 */
	static copyImage(image: Image)
	
	/**
	 * _Pastes an image from the pasteboard._
	 */
	static pasteImage(): Image
}



/**
 * _A path describes a shape._
 * 
 * Shapes can be descriped using a path. Use an instance of Path to create complex shapes that can be drawn to a DrawContext.
 */
export class Path {
	/**
	 * _Constructs a path._
	 * 
	 * Use the methods on the path to create complex shapes.
	 */
	constructor()
	
	/**
	 * _Moves to a point._
	 * 
	 * Moves to a point without drawing a line between the current point and the new point.
	 */
	move(point: Point)
	
	/**
	 * _Adds a line to a point._
	 * 
	 * Add a line from the current point, e.g. set using the move method, and to the new point.
	 */
	addLine(point: Point)
	
	/**
	 * _Adds a rectangle._
	 * 
	 * This is a convenience function for adding a rectangle to the path starting from the lower left corner and drawing the lines counter-clockwise until the rectangle is closed.
	 */
	addRect(rect: Rect)
	
	/**
	 * _Adds an ellipse._
	 * 
	 * Adds an ellipse incapsulated by the provided rectangle to the path.
	 */
	addEllipse(rect: Rect)
	
	/**
	 * _Adds a rounded rectangle._
	 * 
	 * Adds a rounded rectangle to the path. The corner width specifies the horizontal size of the corner and the corner height specifies the the vertical size of the corner.
	 */
	addRoundedRect(rect: Rect, cornerWidth: number, cornerHeight: number)
	
	/**
	 * _Adds a cubic curve to a point._
	 * 
	 * Adds a cubic Bézier curve to the path with the specified end point and control points.
	 */
	addCurve(point: Point, control1: Point, control2: Point)
	
	/**
	 * _Adds a quadratic curve to a point._
	 * 
	 * Adds a quadratic Bézier curve to the specified end point with the specified control point.
	 */
	addQuadCurve(point: Point, control: Point)
	
	/**
	 * _Adds a set of lines._
	 * 
	 * Adds straight lines between an array of points. Calling this method is equivalent to calling the move function with the first point in the array of points and then calling addLine on the subsequent points in the array.
	 */
	addLines(points: Point[])
	
	/**
	 * _Adds a set of rectangles._
	 * 
	 * Calling this is equivalent to repeatedly calling addRect.
	 */
	addRects(rects: Rect[])
	
	/**
	 * _Closes a sub path._
	 * 
	 * Adds a straight line from the current point to the start of the current subpath.
	 */
	closeSubpath()
}



/**
 * _Provides access to your photo library._
 * 
 * In order to read from your photo library, you must grant the app access to your photo library. The first time you use the APIs, the app will prompt for access but if you deny the request, all API calls will fail. In that case you must enable access to the photo library from the system settings.
 */
export class Photos {
	/**
	 * _Presents the photo library for picking an image._
	 * 
	 * Use this for picking an image from the photo library.
	 */
	static fromLibrary(): Promise<Image>
	
	/**
	 * _Opens the camera for taking an image._
	 * 
	 * Use this for taking a new image using the camera.
	 */
	static fromCamera(): Promise<Image>
	
	/**
	 * _Get latest photo._
	 * 
	 * Reads the latest photo from your photo library. If no photo is available, the promise will be rejected.
	 */
	static latestPhoto(): Promise<Image>
	
	/**
	 * _Get latest photos._
	 * 
	 * Reads the latests photos from your photo library. If no photo is available, the promise will be rejected.
	 */
	static latestPhotos(count: number): Promise<Image[]>
	
	/**
	 * _Get latest screenshot._
	 * 
	 * Reads the latest screenshot from your photo library. If no screenshot is available, the promise will be rejected.
	 */
	static latestScreenshot(): Promise<Image>
	
	/**
	 * _Get latest screenshots._
	 * 
	 * Reads the latests screenshots from your photo library. If no screenshot is available, the promise will be rejected.
	 */
	static latestScreenshots(count: number): Promise<Image[]>
	
	/**
	 * _Removes latest photo._
	 * 
	 * Before removing the photo, an alert is shown prompting you to confirm the removal.
	 */
	static removeLatestPhoto()
	
	/**
	 * _Removes latest photos._
	 * 
	 * Before removing the photo, an alert is shown prompting you to confirm the removal.
	 */
	static removeLatestPhotos(count: number)
	
	/**
	 * _Removes latest screenshot._
	 * 
	 * Before removing the screenshot, an alert is shown prompting you to confirm the removal.
	 */
	static removeLatestScreenshot()
	
	/**
	 * _Removes latest screenshots._
	 * 
	 * Before removing the screenshot, an alert is shown prompting you to confirm the removal.
	 */
	static removeLatestScreenshots(count: number)
}



/**
 * _Structure representing a point._
 * 
 * The structure encapsulates a coordinate in a two-dimensional coordinate system.
 */
export class Point {
	/**
	 * _X value._
	 */
	x: number
	
	/**
	 * _Y value._
	 */
	y: number
	
	/**
	 * _Constructs a new point._
	 */
	constructor(x: number, y: number)
}



/**
 * _Presents an item._
 * 
 * Use the quick look to present a file, an image or text string. The quick look will try to choose the best suited presentation of the item.
 */
export class QuickLook {
	/**
	 * _Presents the item._
	 * 
	 * Chooses the best suited presentation of the item and performs the presentation if possible.
	 */
	static present(item: any): Promise
}



/**
 * _Structure representing a rectangle._
 * 
 * The structure has a width, height and a coordinate in a two-dimensional coordinate system.
 */
export class Rect {
	/**
	 * _Minimum X value._
	 * 
	 * The smallest x-coordinate in the rectangle.
	 */
	minX: number
	
	/**
	 * _Minimum Y value._
	 * 
	 * The smallest y-coordinate in the rectangle.
	 */
	minY: number
	
	/**
	 * _Maximum X value._
	 * 
	 * The greatest x-coordinate in the rectangle.
	 */
	maxX: number
	
	/**
	 * _Maximum Y value._
	 * 
	 * The greatest y-coordinate in the rectangle.
	 */
	maxY: number
	
	/**
	 * _X value._
	 * 
	 * The x-coordinate of the rectangle.
	 */
	x: number
	
	/**
	 * _Y value._
	 * 
	 * The y-coordinate of the rectangle.
	 */
	y: number
	
	/**
	 * _Width of rectangle._
	 * 
	 * The width of the rectangle.
	 */
	width: number
	
	/**
	 * _Height of rectangle._
	 * 
	 * The height of the rectangle.
	 */
	height: number
	
	/**
	 * _Point that specifies the rectangles origin._
	 * 
	 * The x- and y-coordinate that specifies the rectangles origin as a Point structure.
	 */
	origin: Point
	
	/**
	 * _Size of the rectangle._
	 * 
	 * The width and height of the rectangle as a Size structure.
	 */
	size: Size
	
	/**
	 * _Constructs a rectangle._
	 * 
	 * Constructs a new rectangle placed in a two-dimensional coordinate system.
	 */
	constructor(x: number, y: number, width: number, height: number)
}



/**
 * _Recurrence rule used with reminders and calendar events._
 * 
 * A recurrence rule specifies how often a reminder or a calendar event should repeat.
 */
export class RecurrenceRule {
	/**
	 * _Constructs a daily recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
	 */
	static daily(interval: number): RecurrenceRule
	
	/**
	 * _Constructs a daily recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
	 */
	static dailyEndDate(interval: number, endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a daily recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every day and a value of 3 specifies that the rule should repeat every third day.
	 */
	static dailyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a weekly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 */
	static weekly(interval: number): RecurrenceRule
	
	/**
	 * _Constructs a weekly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 */
	static weeklyEndDate(interval: number, endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a weekly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 */
	static weeklyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a monthly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 */
	static monthly(interval: number): RecurrenceRule
	
	/**
	 * _Constructs a monthly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 */
	static monthlyEndDate(interval: number, endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a monthly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 */
	static monthlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a yearly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
	 */
	static yearly(interval: number): RecurrenceRule
	
	/**
	 * _Constructs a yearly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
	 */
	static yearlyEndDate(interval: number, endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a yearly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
	 */
	static yearlyOccurrenceCount(interval: number, occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a complex weekly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexWeekly(interval: number, daysOfTheWeek: number[], setPositions: number[]): RecurrenceRule
	
	/**
	 * _Constructs a complex weekly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexWeeklyEndDate(interval: number, daysOfTheWeek: number[], setPositions: number[], endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a complex weekly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every week and a value of 3 specifies that the rule should repeat every third week.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexWeeklyOccurrenceCount(interval: number, daysOfTheWeek: number[], setPositions: number[], occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a complex monthly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexMonthly(interval: number, daysOfTheWeek: number[], daysOfTheMonth: number[], setPositions: number[]): RecurrenceRule
	
	/**
	 * _Constructs a complex monthly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexMonthlyEndDate(interval: number, daysOfTheWeek: number[], daysOfTheMonth: number[], setPositions: number[], endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a complex monthly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every month and a value of 3 specifies that the rule should repeat every third month.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexMonthlyOccurrenceCount(interval: number, daysOfTheWeek: number[], daysOfTheMonth: number[], setPositions: number[], occurrenceCount: number): RecurrenceRule
	
	/**
	 * _Constructs a complex yearly recurrence rule._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexYearly(interval: number, daysOfTheWeek: number[], monthsOfTheYear: number[], weeksOfTheYear: number[], daysOfTheYear: number[], setPositions: number[]): RecurrenceRule
	
	/**
	 * _Constructs a complex yearly recurrence rule with an end date._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third week.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexYearlyEndDate(interval: number, daysOfTheWeek: number[], monthsOfTheYear: number[], weeksOfTheYear: number[], daysOfTheYear: number[], setPositions: number[], endDate: Date): RecurrenceRule
	
	/**
	 * _Constructs a complex yearly recurrence rule with an occurrence count._
	 * 
	 * The interval should have a value greater than 0 and specifies how often the the pattern repeats. For example, an interval of 1 specifies that the rule should repeat every year and a value of 3 specifies that the rule should repeat every third year.
	 * 
	 * The setPositions filters which recurrences to include in the rule's frequency. For example, a yearly recurrence rule that has a daysOfTheWeek value that specifies Monday through Friday and setPositions contain 2 and -1, occurs only on the second weekday and last weekday of every year.
	 */
	static complexYearlyOccurrenceCount(interval: number, daysOfTheWeek: number[], monthsOfTheYear: number[], weeksOfTheYear: number[], daysOfTheYear: number[], setPositions: number[], occurrenceCount: number): RecurrenceRule
}



/**
 * _Manages reminders in calendars._
 * 
 * Used for creating, fetching and removing reminders from your calendars.
 */
export class Reminder {
	/**
	 * _Identifier of reminder._
	 */
	identifier: string
	
	/**
	 * _Title of reminder._
	 */
	title: string
	
	/**
	 * _Notes associated with reminder._
	 */
	notes: string
	
	/**
	 * _Whether the reminder is completed_
	 */
	isCompleted: bool
	
	/**
	 * _Priority of reminder._
	 * 
	 * Specifies the prirority of the reminder with 0 representing an undefined priority, 1 the highest priority, and 9 the lowest priority.
	 */
	priority: number
	
	/**
	 * _Due date of reminder._
	 */
	dueDate: Date
	
	/**
	 * _Completion date of reminder._
	 */
	completionDate: Date
	
	/**
	 * _Creation date of reminder._
	 */
	creationDate: Date
	
	/**
	 * _Calendar the reminder is stored in._
	 */
	calendar: Calendar
	
	/**
	 * _Constructs a reminder._
	 * 
	 * In order to add the reminder to your calendar, you must call the save() function.
	 */
	constructor()
	
	/**
	 * _Adds a recurrence rule._
	 * 
	 * Recurrence rules specify when the reminder should be repeated. See the documentation of RecurrenceRule for more information on creating rules.
	 */
	addRecurrenceRule(recurrenceRule: RecurrenceRule)
	
	/**
	 * _Removes all recurrence rules._
	 */
	removeAllRecurrenceRules()
	
	/**
	 * _Saves reminder._
	 * 
	 * Saves changes to a reminder, inserting it into the calendar if it is newly created.
	 */
	save()
	
	/**
	 * _Removes reminder from calendar._
	 */
	remove()
	
	/**
	 * _Fetches the schedule of reminders._
	 * 
	 * The fetched result contains reminders that are due today and reminders that are overdue. This is similar to the reminders shown in the Reminders apps "Scheduled" list. For performance reasons iOS limits fetched results to events within a four year timespan.
	 */
	static scheduled(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders._
	 * 
	 * For performance reasons iOS limits fetched results to events within a four year timespan.
	 */
	static all(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all completed reminders._
	 * 
	 * For performance reasons iOS limits fetched results to events within a four year timespan.
	 */
	static allCompleted(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all incomplete reminders._
	 * 
	 * For performance reasons iOS limits fetched results to events within a four year timespan.
	 */
	static allIncomplete(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due today._
	 */
	static allDueToday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due today._
	 */
	static completedDueToday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due today._
	 */
	static incompleteDueToday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due tomorrow._
	 */
	static allDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due tomorrow._
	 */
	static completedDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due tomorrow._
	 */
	static incompleteDueTomorrow(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due yesterday._
	 */
	static allDueYesterday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due yesterday._
	 */
	static completedDueYesterday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due yesterday._
	 */
	static incompleteDueYesterday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due this week._
	 */
	static allDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due this week._
	 */
	static completedDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due this week._
	 */
	static incompleteDueThisWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due next week._
	 */
	static allDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due next week._
	 */
	static completedDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due next week._
	 */
	static incompleteDueNextWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches all reminders due last week._
	 */
	static allDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders due last week._
	 */
	static completedDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders due last week._
	 */
	static incompleteDueLastWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches reminders completed today._
	 * 
	 * Note that this does not take the due date into account. This will return all reminders that you have completed today.
	 */
	static completedToday(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches reminders completed this week._
	 * 
	 * Note that this does not take the due date into account. This will return all reminders that you have completed this week.
	 */
	static completedThisWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches reminders completed last week._
	 * 
	 * Note that this does not take the due date into account. This will return all reminders that you have completed last week.
	 */
	static completedLastWeek(calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches due reminders._
	 * 
	 * Fetches reminders that are due within the time interval constituted by the start and end dates.
	 */
	static allDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders._
	 * 
	 * Fetches reminders that are completed and that were due within the time interval constituted by the start and end dates.
	 */
	static completedDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches incomplete reminders._
	 * 
	 * Fetches reminders that are incomplete and that were due within the time interval constituted by the start and end dates.
	 */
	static incompleteDueBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>
	
	/**
	 * _Fetches completed reminders._
	 * 
	 * Fetches reminders that were completed within the time interval constituted by the start and end dates.
	 */
	static completedBetween(startDate: Date, endDate: Date, calendars: Calendar[]): Promise<Reminder[]>
}



/**
 * _Performs HTTP requests._
 * 
 * Performs a URL request and returns the response in an appropriate format.
 */
export class Request {
	/**
	 * _URL to send request to._
	 */
	url: string
	
	/**
	 * _HTTP method used for the request._
	 * 
	 * Specifies the HTTP method to use when sending the request. The default is to send the request using the GET HTTP method.
	 */
	method: string
	
	/**
	 * _HTTP headers to send with the request._
	 * 
	 * Key value pairs where the key is the name of an HTTP header and the value will be sent as the value for the HTTP header.
	 */
	headers: {string: string}
	
	/**
	 * _Body to send with the request._
	 * 
	 * The body will be send along the request. While this property can be any value, currently only strings and Data is supported.
	 * 
	 * Be aware that this property is ignored if you convert the request to a multipart request using `addParameterToMultipart`, `addFileToMultipart` or `addFileDataToMultipart`.
	 */
	body: any
	
	/**
	 * _Function called upon redirect._
	 * 
	 * The function determines how redirects should be handled. By default redirects are allowed. When invoked the function is supplied with the request that we're about to redirect to. The function can return the request to continue redirecting or it can return another request to redirect to. Returning null will stop the redirect. Note that onRedirect will only be invoked on the initial request. Consecutive redirects should be handled on the initial request.
	 */
	onRedirect: (Request) => Request
	
	/**
	 * _Response of the request._
	 * 
	 * The response is not populated until the request have been completed. The response is an object that looks like the following example.
	 * 
	 *     {
	 *       "url": "https://example.com/",
	 *       "statusCode": 200
	 *       "mimeType": "application/json",
	 *       "textEncodingName": "utf-8",
	 *       "headers": {
	 *         "Content-Type": "application/json;charset=utf-8",
	 *         "Content-Length": "17671"
	 *       }
	 *     }
	 */
	response: {string: any}
	
	/**
	 * _Constructs a request._
	 * 
	 * Constructs a new request that will be sent to the provided URL. The request is not sent until an appropriate load method is called, e.g. loadImage for downloading and interpreting the response as an image.
	 */
	constructor(url: string)
	
	/**
	 * _Sends request._
	 * 
	 * Call to send the configured request to the specified URL. The raw response is provided when the returned promise is fulfilled.
	 */
	load(): Promise<Data>
	
	/**
	 * _Sends request and parses response as a string._
	 * 
	 * Call to send the configured request to the specified URL. The response is parsed to a string and provided when the returned promise is fulfilled.
	 */
	loadString(): Promise<string>
	
	/**
	 * _Sends request and parses response as JSON._
	 * 
	 * Call to send the configured request to the specified URL. The response is expected to be a valid JSON string and is parsed into an object.
	 */
	loadJSON(): Promise<any>
	
	/**
	 * _Sends request and parses response as an image._
	 * 
	 * Call to send the configured request to the specified URL. The response is expected to be an image.
	 */
	loadImage(): Promise<Image>
	
	/**
	 * _Adds a parameter to a multipart request._
	 * 
	 * Converts the request to a multipart request and adds a parameter with the specified name and value. Be aware that the `body` property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
	 * 
	 * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
	 */
	addParameterToMultipart(name: string, value: string)
	
	/**
	 * _Adds a file to a multipart request._
	 * 
	 * Converts the request to a multipart request and adds the file to the request. Be aware that the `body` property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
	 * 
	 * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
	 */
	addFileDataToMultipart(data: Data, mimeType: string, name: string, filename: string)
	
	/**
	 * _Adds a file to a multipart request._
	 * 
	 * Converts the request to a multipart request and adds the file to the request. The function will automatically determine the MIME type of the file as well as the filename. Be aware that the `body`\\ property on the request is ignored for multipart requests as\\ parameters and files added to the request constitutes the body.
	 * 
	 * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
	 */
	addFileToMultipart(filePath: string, name: string, filename: string)
	
	/**
	 * _Adds an image to a multipart request._
	 * 
	 * Converts the request to a multipart request and adds the image to the request. The function will automatically determine the MIME type of the file Be aware that the `body` property on the request is ignored for multipart requests as parameters and files added to the request constitutes the body.
	 * 
	 * Calling this function will make the request a multipart request. When the request is send, the content type will automatically be set to "multipart/form-data".
	 */
	addImageToMultipart(image: Image, name: string, filename: string)
}



/**
 * _Presents a website._
 * 
 * Presents a website either in-app or by leaving the app an opening the Safari app.
 */
export class Safari {
	/**
	 * _Presents a website in-app._
	 * 
	 * Presents a website without leaving the app. To present a website and leave the app, take a look at the Application type.
	 */
	static openInApp(url: string): Promise
	
	/**
	 * _Presents a website._
	 * 
	 * Presents a website in the Safari app, thus leaving the current app.
	 */
	static open(url: string)
}



/**
 * _Access information about the script._
 * 
 * Allows for accessing information about the script that is currently being run and controlling selected parts of the script execution.
 */
export class Script {
	/**
	 * _Name of the script._
	 */
	static name(): string
	
	/**
	 * _Informs the system about script completion._
	 * 
	 * Call this function to inform the system that the script have completed running.
	 * 
	 * When a script is run inside Siri and the Shortcuts app, Scriptable use heuristics to determine if the script have completed. If you find that a script takes too long to complete, you can manually call the `complete` function to stop the execution. Note that this should be done as the very last action the script performs.
	 * 
	 * When the script is run from a share sheet, the `complete` function will complete execution and dismiss the presented view.
	 */
	static complete()
}



/**
 * _Offers standard activities to perform on items._
 * 
 * The activity picker presents activities that can be performed on a set of items. For example sending an item via an email or SMS, saving an item to disk or opening an item in a third party app. Available activites vary depending on the provided items.
 */
export class ShareSheet {
	/**
	 * _Presents the activity picker._
	 * 
	 * Presents a share sheet with an array of items to share. The activities included in the presented sheet will vary based on the type of item.
	 */
	static present(activityItems: any[]): Promise<{string: any}>
}



/**
 * _Structure representing a size._
 * 
 * The structure has a width and a height to specify a two-dimensional size.
 */
export class Size {
	/**
	 * _Width value._
	 */
	width: number
	
	/**
	 * _Height value._
	 */
	height: number
	
	/**
	 * _Constructs a new size._
	 */
	constructor(width: number, height: number)
}



/**
 * _Speaks a text._
 * 
 * If used in a script triggered by a Siri Shortcut, Siri will speak the text.
 */
export class Speech {
	/**
	 * Speaks a text.
	 */
	static speak(text: string)
}



/**
 * _Renders a table._
 * 
 * Tables present data in a structured manner. A table contains rows which in turn contains cells.
 */
export class UITable {
	/**
	 * _Whether to show separators._
	 * 
	 * Whether to show separators between rows. Defaults to false.
	 */
	showSeparators: bool
	
	/**
	 * _Constructs a table._
	 * 
	 * Use a table to present data in a structured manner.
	 */
	constructor()
	
	/**
	 * _Adds a row._
	 * 
	 * Adds a row to the table. Rows are shown vertically in the table view, i.e. from the top and down. Rows are rendered in the order they are added.
	 */
	addRow(row: UITableRow)
	
	/**
	 * _Removes a row._
	 * 
	 * Removes a row from the table.
	 */
	removeRow(row: UITableRow)
	
	/**
	 * _Removes all rows._
	 * 
	 * Removes all rows from the table. If the table is presented, you must call the `reload` function in order for the changes to be reflected visually.
	 */
	removeAllRows()
	
	/**
	 * _Reloads the table._
	 * 
	 * If you add or remove rows while a table view is presented, you must reload the table in order for the changes to take effect.
	 */
	reload()
	
	/**
	 * _Presents the table._
	 */
	present(): Promise
}



/**
 * _Cell in a UITableRow._
 * 
 * Cells are shown horizontally in a UITableRow which in turn is shown vertically in a UITable. Cells have content, e.g. a text or an image.
 */
export class UITableCell {
	/**
	 * _Relative width of the cell._
	 * 
	 * A width weight specifies the relative width of the cell. When computing the absolute width of the cell, all width weights are taken into account. Consider the following example.
	 * 
	 * Cell A has a width weight of 50. Cell B has a width weight of 100. Cell C has a width wegiht of 150.
	 * 
	 * Assume that the row has an absolute width of 100. The width will be distributed among cells A, B and C. B will be double as wide as A but C will be fifty percent wider than B and three times as wide as A.
	 */
	widthWeight: number
	
	/**
	 * _Called when the button is tapped._
	 * 
	 * Buttons cannot be tapped when the table is presented in Siri.
	 */
	onTap: () => void
	
	/**
	 * _Whether to dismiss the table when the button is tapped._
	 * 
	 * Defaults to false.
	 */
	dismissOnTap: bool
	
	/**
	 * _Color of the title._
	 * 
	 * This only have an effect on cells with a title. By default the color is null, in which case an appropriate color is automatically chosen based on the theme of the app and the context the script is running in.
	 */
	titleColor: Color
	
	/**
	 * _Color of the subtitle._
	 * 
	 * This only have an effect on cells with a subtitle. By default the color is null, in which case an appropriate color is automatically chosen based on the theme of the app and the context the script is running in.
	 */
	subtitleColor: Color
	
	/**
	 * _Constructs a text cell._
	 * 
	 * Constructs a new cell containing a text.
	 */
	static text(title: string, subtitle: string): UITableCell
	
	/**
	 * _Constructs an image cell._
	 * 
	 * Constructs a new cell containing an image.
	 */
	static image(image: Image): UITableCell
	
	/**
	 * _Constructs an image cell._
	 * 
	 * Constructs a new cell that loads the image at the specified URL.
	 */
	static imageAtURL(url: string): UITableCell
	
	/**
	 * _Constructs a button cell._
	 * 
	 * Constructs a new cell that contains a button. Set the `onTap` property to specify an action to performed when the button is tapped.
	 */
	static button(title: string): UITableCell
	
	/**
	 * _Left aligns content._
	 * 
	 * Specifies that content in the cell should be left aligned.
	 */
	leftAligned()
	
	/**
	 * _Center aligns content._
	 * 
	 * Specifies that content in the cell should be center aligned.
	 */
	centerAligned()
	
	/**
	 * _Right aligns content._
	 * 
	 * Specifies that content in the cell should be right aligned.
	 */
	rightAligned()
}



/**
 * _Row in a UITable._
 * 
 * Rows can be added to an instance of UITable. A row is shown vertically in a UITable in the order they are added to the table. Rows contain cells which are shown horizontally in the order they are added to the row.
 */
export class UITableRow {
	/**
	 * _Spacing between cells._
	 * 
	 * Specifies the horizontal spacing between cells in the row.
	 */
	cellSpacing: number
	
	/**
	 * _Height of the row._
	 * 
	 * The height of the row defaults to 44.
	 */
	height: number
	
	/**
	 * _Whether the cell is a header._
	 * 
	 * Headers are highlighted cells that helps users understand context. Defaults to false.
	 */
	isHeader: bool
	
	/**
	 * _Whether to dismiss the table when the row is selected._
	 * 
	 * Defaults to true.
	 */
	dismissOnSelect: bool
	
	/**
	 * _Called when the row is selected._
	 * 
	 * Called when the row is selected when the table is presented. If this has no value, the row cannot be selected. Defaults to null.
	 * 
	 * Rows cannot be tapped when the tables is presented in Siri.
	 */
	onSelect: (number) => void
	
	/**
	 * _Background color._
	 */
	backgroundColor: Color
	
	/**
	 * _Constructs a row._
	 * 
	 * Rows are shown vertically in a UITable. A row contains cells which are displayed horizontally.
	 */
	constructor()
	
	/**
	 * _Adds a cell._
	 * 
	 * Adds a cell to the row. Note that cells are shown in the order they are added to the row.
	 */
	addCell(cell: UITableCell)
	
	/**
	 * _Adds a text cell._
	 * 
	 * Constructs a new cell containing the specified string and adds it to the row.
	 */
	addText(title: string, subtitle: string): UITableCell
	
	/**
	 * _Adds an image cell._
	 * 
	 * Constructs a new cell containing the specified image and adds it to the row.
	 */
	addImage(image: Image): UITableCell
	
	/**
	 * _Adds an image cell._
	 * 
	 * Constructs a new cell that loads the image at the specified url and adds the cell to the row.
	 */
	addImageAtURL(url: string): UITableCell
	
	/**
	 * _Adds a button cell._
	 * 
	 * Constructs a new cell that contains a button. Set the `onTap` property to specify an action to performed when the button is tapped.
	 */
	addButton(title: string): UITableCell
}



/**
 * _Manages URL schemes for Scriptable._
 * 
 * Use URL schemes to launch the app and perform an action, such as running a script. The app conforms to the `scriptable://` URL scheme. The following actions can be performed using the URL scheme.
 * 
 * **Adding a script** To add a new script, you should use the following URL scheme:
 * 
 * `scriptable:///add`
 * 
 * **Opening a script** To open an existing script, you should use the following URL scheme:
 * 
 * `scriptable:///open?scriptName=Example`
 * 
 * The `scriptName` query parameter is the name of the script to open. `scriptName` must be URL encoded. You may optionally add the query parameter `openSettings` with a value of `true` to automatically open the script settings.
 * 
 * **Running a script** To run an existing script, you should use the following URL scheme:
 * 
 * `scriptable:///run?scriptName=Example`
 * 
 * The `scriptName` query parameter is the name of the script to run. `scriptName` must be URL encoded.
 * 
 * If you set `openEditor` to true, the script will run with the editor shown opposed to running directly from the list of scripts. Opening the editor to run the script is beneficial in cases where you need to view messages logged to the console.
 * 
 * In addition to the `scriptable://` scheme, you can also perform the above actions using the universal link `open.scriptable.app`, e.g. `https://open.scriptable.app/run?scriptName=Example`
 */
export class URLScheme {
	/**
	 * _Gets all parameters from invocation of URL scheme._
	 * 
	 * @deprecated Deprecated in version 1.3. Use args.queryParameters instead.
	 * 
	 * Gets all the query parameters that were passed in the URL when running this script by invoking its URL scheme.
	 */
	static allParameters(): {string: string}
	
	/**
	 * _Gets a parameters from invocation of URL scheme._
	 * 
	 * @deprecated Deprecated in version 1.3. Use args.queryParameters instead.
	 * 
	 * Gets the value of a query parameter that was passed in the URL when running this script by invoking its URL scheme.
	 */
	static parameter(name: string): string
	
	/**
	 * _URL for opening the script._
	 * 
	 * Gets the URL for opening the current script. When making a request to the returned URL from another app, e.g. Safari, the script will be opened.
	 */
	static forOpeningScript(): string
	
	/**
	 * _URL for opening script settings._
	 * 
	 * Gets the URL for opening the settings of the current script. When making a request to the returned URL from another app, e.g. Safari, the settings of the current script will be opened.
	 */
	static forOpeningScriptSettings(): string
	
	/**
	 * _URL for running script._
	 * 
	 * Gets the URL for running the current script. When making a request to the returned URL from another app, e.g. Safari, the current script will run.
	 * 
	 * Any query parameter in the URL will be available using the URLScheme bridge. Get the query paramters using the `allParameters()` and `parameter(name)` functions.
	 */
	static forRunningScript(): string
}



/**
 * _Unique identifier._
 * 
 * A universally unique value that can be used to identify items.
 */
export class UUID {
	/**
	 * _Get string value._
	 * 
	 * Used for getting the string value of a UUID.
	 */
	static string(): string
}



/**
 * _Presents websites and evaluates JavaScript on websites._
 * 
 * Supports rendering HTML as well as loading a file and rendering it. A file can be of various types. It could for example be an HTML file or an image.
 * 
 * The web view also supports evaluating JavaScript on a website.
 */
export class WebView {
	/**
	 * _Function called upon load of a request._
	 * 
	 * When the web view performs a request to load a resource, the function can determine whether or not to allow the request. Disallowing request can speed up the time it takes to load the website.
	 * 
	 * By default all requests are allowed.
	 */
	shouldAllowRequest: (Request) => bool
	
	/**
	 * _Constructs web view._
	 * 
	 * Constructs a new web view. Use a web view to evaluate JavaScript on websites.
	 */
	constructor()
	
	/**
	 * _Loads HTML and renders it._
	 */
	static loadHTML(html: string, baseURL: string, preferredSize: Size): Promise
	
	/**
	 * _Loads a file and renders it._
	 * 
	 * Files can be of various types, including HTML files and images.
	 * 
	 * The supplied HTML file can reference files and nested directories in the same directory as the HTML file resides.
	 * 
	 * The optional `preferredSize` parameter is ignored unless the script is run in a Siri Shortcut.
	 * 
	 * If you are displaying large images in a memory constrained envrionment, for example in a Siri Shortcut, you should use the WebView bridge instead of the QuickLook bridge. The technical reason for this is that a Siri Shortcut and other app extension processes have very limited memory and loading a very large image will cause the app extension to be terminated. However, the web view will run in a different process meaning that it is not affected by the same memory constraints.
	 */
	static loadFile(fileURL: string, preferredSize: Size): Promise
	
	/**
	 * _Loads URL in web view and presents the web view._
	 * 
	 * The optional `preferredSize` parameter is ignored unless the script is run in a Siri Shortcut.
	 */
	static loadURL(url: string, preferredSize: Size): Promise
	
	/**
	 * _Loads URL in web view._
	 * 
	 * Loads the URL in the web view. The returned promise will complete once the web view have finished loading.
	 */
	loadURL(url: string): Promise
	
	/**
	 * _Loads request in web view._
	 * 
	 * When loading a request into the web view, the HTTP method, body and headers of the request will be respected. The onRedirect function on the request will not be invoked.
	 */
	loadRequest(request: Request): Promise
	
	/**
	 * _Loads HTML in web view._
	 * 
	 * Loads the HTML into the web view. The returned promise will complete once the web view have finished loading.
	 */
	loadHTML(html: string, baseURL: string): Promise
	
	/**
	 * _Evaluates JavaScript in the web view._
	 * 
	 * Evaluates JavaScript in the current context of the web view. The returned promise carries the result of evaluating the JavaScript.
	 * 
	 * When passing `false` to the `useCallback` parameter, which is the default value, evaluation will terminate after evaluating the last line of the JavaScript. The value on the last line of the script will be carried by the promise returned by `evaluateJavaScript`.
	 * 
	 * When passing `true` to the `useCallback` parameter, evaluation will only complete after the globally available `completion` function is called. Any value passed to the function, will be carried by the promise returned by `evaluateJavaScript`.
	 * 
	 * The log is available from the evaluated JavaScript, i.e. messages passed to the globally available `log` and `logError` functions will be shown in the log.
	 */
	evaluateJavaScript(javaScript: string, useCallback: bool): Promise<any>
	
	/**
	 * _Reads and returns HTML from the loaded website._
	 */
	getHTML(): Promise<any>
	
	/**
	 * _Presents the web view._
	 * 
	 * The web view is presented with the content that has been loaded into it.
	 */
	present(): Promise
	
	/**
	 * _Waits for the web view to load._
	 * 
	 * The returned promise will be fulfilled when the web view finishes loading. If the load fails, the promise will be fulfilled with an error. Use this with caution. If the web view is not loading a new page or is not about to load a new page, the returned promise will never be fulfilled. This limitation exists because Scriptable cannot determine if a web view is about to load a page in cases where evaluating JavaScript in the web view causes a new page to load.
	 * 
	 * Generally this should only be used when loading causing a new page to load from `evaluateJavaScript`. In other cases, e.g. when loading a URL using `loadURL`, the returned promise will be fulfilled when the page have been loaded.
	 */
	waitForLoad(): Promise<any>
}



/**
 * _Event driven XML parser._
 * 
 * The XMLParser is an event driven XML parser that calls provided callback functions when it encounters elements to be parsed. It does not iself do any parsing.
 */
export class XMLParser {
	/**
	 * _Function called when the parser begins parsing a document._
	 */
	didStartDocument: () => void
	
	/**
	 * _Function called when the parser ends parsing a document._
	 * 
	 * The the parser calls the function, it has successfully completed parsing the document.
	 */
	didEndDocument: () => void
	
	/**
	 * _Function called when starting to parse an element._
	 * 
	 * Called by the parser when it encounters a start tag for an element. The function takes the element name as a parameter. Use this function to update your state and prepare for receiving the characters of the element. After this function is called, the parser will call the foundCharacters callback function with all or parts of the characters of the element.
	 */
	didStartElement: (string) => void
	
	/**
	 * _Function called when ended parsing an element._
	 * 
	 * Called by the parser when it encounters an end tag for an element. The function takes the element name as a parameter.
	 */
	didEndElement: (string) => void
	
	/**
	 * _Function called when the parser finds characters of an element._
	 * 
	 * The parser calls this function with a string whenever it finds characters for the current element. This function may be called several times for a single element.
	 */
	foundCharacters: (string) => void
	
	/**
	 * _Function called when the parser encounters an error._
	 * 
	 * The parser will call this function when it encounters a fatal error preventing it from continuing to parse. When the function is called the parsing is stopped.
	 */
	parseErrorOccurred: (string) => void
	
	/**
	 * _XML string to be parsed._
	 */
	string: string
	
	/**
	 * _Constructs an XMLParser._
	 * 
	 * Constructs an even driven XML parser. It does not itself do any parsing therfore the callback functions must be set before starting to parse.
	 */
	constructor(string: string)
	
	/**
	 * _Starts parsing._
	 * 
	 * Before calling this function you should ensure that the parser is correctly configured, i.e. the necessary callback functions should be set.
	 */
	parse(): bool
}
