// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This template shows how to write a global plugin. */

/** 
 * *Presents an alert.*
 * 
 * Use this to configure an alert presented modally or as a sheet. After configuring the alert, call presentAlert() or presentSheet() to present the alert. The two presentations methods will return a value which carries the index of the action that was selected when fulfilled.
 */
export class Alert {

	/**
	 * Title displayed in the alert. Usually a short string.
	 */
	title: {[key: string]: string};
	/**
	 * Detailed message displayed in the alert.
	 * @deprecated
	 */
	message: "alert" | "popup";

	/**
	 * *Constructs a text cell.*
	 * 
	 * Constructs a new cell containing a text.
	 * 
	 * @param title 
	 * @param subtitle 
	 * 
	 * some more text
	 */
	static text(title: string, subtitle: string): UITableCell

	constructor()
}
export namespace Alert {
	interface Title {
		title: string;
	}
}

/*~ If you need to declare several types, place them inside a namespace
 *~ to avoid adding too many things to the global namespace.
 */
declare namespace MyLibrary {
    type BinaryFormatCallback = (n: number) => string;
    interface BinaryFormatOptions {
        prefix?: string;
        padding: number;
    }
}
