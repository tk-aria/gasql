'use strict'
import LoginServer from "./loginServer";

const SHEET_ID: string = '1Wb4TuR_4i9WFYgLgHw8Ku_KAyHKDCH4AjbfJiEPDfeA';
const loginServer = new LoginServer(SHEET_ID);

/**
 *
 */
function config(){
	Logger.log(ScriptApp.getService().getUrl());
	Logger.log(ScriptApp.getOAuthToken());
}

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
