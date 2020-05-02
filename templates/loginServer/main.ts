'use strict'
import LoginServer from "./loginServer";

const SHEET_ID: string = 'Sheet ID';
const loginServer = new LoginServer(SHEET_ID);

/**
 * server entry.
 */
function doGet() {
	return loginServer.Get();
}

/**
 * post entry.
 * @param {*} payload
 */
function doPost(payload :any) {
	return loginServer.Post(payload);
}
