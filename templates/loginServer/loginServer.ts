'use strict'

/**
 * login server (ret server instance uri.)
 * @export
 * @class LoginServer
 */
export default class LoginServer {

	/**
	 * read/writable sheet.
	 *
	 * @protected
	 * @type {GoogleAppsScript.Spreadsheet.SpreadsheetApp}
	 * @memberof LoginServer
	 */
	protected sheet: GoogleAppsScript.Spreadsheet.Sheet;

	/**
	 * server logic. (method list)
	 *
	 * @protected
	 * @type {{ [key: string]: any }}
	 * @memberof LoginServer
	 */
	protected serverLogic: { [key: string]: any } = {};

	/**
	 * Creates an instance of LoginServer.
	 *
	 * @memberof LoginServer
	 */
	public constructor(spreadSheetId :string, sheetName: string) {

		// SpreadSheet読み込み.
		this.sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName(sheetName);

		// サーバーインスタンスの追加処理.
		this.serverLogic['append'] = (payload: any) => {

			const lastRow = this.sheet.getLastRow();
			this.sheet.appendRow([lastRow, payload.key, payload.uri ]);

			return JSON.stringify({ status: 200 });
		};

		// 登録したサーバー情報の削除.
		this.serverLogic['delete'] = (payload: any) => {
			return JSON.stringify({ status: 200 });
		};
	}

	/**
	 * return server list.
	 *
	 * @returns {*}
	 * @memberof LoginServer
	 */
	public Get() : any {
		const result = this.SpreadSheetToJson(this.sheet);
		console.log(`json ${result}`);

		const response = ContentService.createTextOutput();
		response.setMimeType(ContentService.MimeType.JSON);
		response.setContent(result);
		return response;
	}

	/**
	 * post entry.
	 *
	 * Content-Type: application/json
	 * < json format >
	 * request
	 * {
	 *   method: "start", // start, shutdown など 
	 *   /
	 *     Gasではapiのendpointを複数作れないので、このようにpostdataにmethodタイプを作成しておく.
	 *   /
	 *   payloadData: {
	 *      // 好きなように送る.
	 *   }
	 * }
	 * responce
	 * {
	 *   status: 200,
	 * }
	 *
	 * @param {*} payload
	 * @returns {*} response
	 * @memberof LoginServer
	 */
	public Post(payload: any) : any {
		const jsonPayload = JSON.parse(payload.postData.getDataAsString());
		const result = this.serverLogic[jsonPayload.method](jsonPayload.payloadData);
		console.log(`json ${result}`);

		const response = ContentService.createTextOutput();
		response.setMimeType(ContentService.MimeType.JSON);
		response.setContent(result);
		return response;
	}

	// https://qiita.com/taichi0514/items/ee6dedff45f9d9e58ef4
	private SpreadSheetToJson(sheet: GoogleAppsScript.Spreadsheet.Sheet){
		let rows = sheet.getDataRange().getValues();
		let keys = rows.splice(0, 1)[0];
		let data = rows.map( (row) => {
			let obj = {}
			row.map((item, index) => {
				obj[keys[index]] = item;
			});
			return obj;
		});
		return JSON.stringify(data, null, 2);
	}
}
