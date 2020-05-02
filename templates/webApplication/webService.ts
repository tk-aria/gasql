'use strict'

/**
 * default entry.
 */
function doGet() {
	return HtmlService.createTemplateFromFile("index").evaluate();
}

/**
 * post entry.
 * Content-Type: application/json
 * @param {*} payload
 */
function doPost(payload :any) {

	const jsonPayload = JSON.parse(payload.postData.getDataAsString());

	// do something...

	const output = ContentService.createTextOutput();
	output.setMimeType(ContentService.MimeType.JSON);
	output.setContent(JSON.stringify({ message: "success!" }));

	return output;
}
