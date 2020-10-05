import myFunc from './test';
/*
function doGet() {
	myFunc();
	return HtmlService.createTemplateFromFile("index").evaluate();
}


function doPost(payload :any) {

	console.log(payload);

	// シートを取得
	var sheet = getSheet('シート名');
	
	// シートの最終行を取得
	var lastRow = sheet.getLastRow();

	// 最終行にデータ挿入
	// 「e.parameter.フォーム名」 でフォームから送信されたパラメータを受け取ることができます
	sheet.appendRow([lastRow, e.parameter.value, new Date(), e.parameter.name]);

	// スプレッドシートのデータ挿入後、元の画面に戻す
	return HtmlService.createTemplateFromFile("index").evaluate();
}

function getSheet(name: string){

	// SSIDからスプレッドシートの取得
	var ssId = '1Wb4TuR_4i9WFYgLgHw8Ku_KAyHKDCH4AjbfJiEPDfeA';
	var ss = SpreadsheetApp.openById(ssId);

	// 指定されたシート名からシートを取得して返却
	var sheet = ss.getSheetByName(name);
	return sheet;
}

function getData() {

	// 指定したシートからデータを取得
	var values = getSheet('シート1').getDataRange().getValues();
	return values;
}
*/
