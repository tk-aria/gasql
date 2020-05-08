'use strict'

/**
 * maybe used for CI/CD?
 *
 * ex)
 *   GoogleAppTrigger.CreateByClockTriggerBuilder('hogeFunc', (builder) => { return builder.everyDays(1).atHour(5); })
 *
 * @export
 * @class GoogleAppTrigger
 */
export default class GoogleAppTrigger {

	trigger: GoogleAppsScript.Script.Trigger;

	/**
	 * Creates an instance of GoogleAppTrigger.
	 * @param {string} callbackName
	 * @param {*} onConfigure
	 * @memberof GoogleAppTrigger
	 */
	public constructor(callbackName: string, onConfigure: (builder: GoogleAppsScript.Script.TriggerBuilder) => GoogleAppsScript.Script.Trigger) {

		const triggerBuilder = ScriptApp.newTrigger(callbackName);
		this.trigger = onConfigure(triggerBuilder);
	}

	/**
	 * help:
	 *   ClockTriggerBuilder: https://developers.google.com/apps-script/reference/script/clock-trigger-builder
	 * @static
	 * @param {string} callbackName
	 * @param {(builder: GoogleAppsScript.Script.ClockTriggerBuilder) => GoogleAppsScript.Script.ClockTriggerBuilder} onConfigure
	 * @returns {GoogleAppTrigger}
	 * @memberof GoogleAppTrigger
	 */
	public static CreateByClockTriggerBuilder(callbackName: string, onConfigure: (builder: GoogleAppsScript.Script.ClockTriggerBuilder) => GoogleAppsScript.Script.ClockTriggerBuilder): GoogleAppTrigger {
		return new GoogleAppTrigger(callbackName, (builder) => {
			return onConfigure( builder.timeBased()).create();
		});
	}
}
