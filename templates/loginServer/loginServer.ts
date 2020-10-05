'use strict'

/**
 * login server (ret server instance uri.)
 * @export
 * @class LoginServer
 */
export default class LoginServer {

	protected scheme: GoogleAppsScript.Spreadsheet.Spreadsheet;

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
	public constructor(spreadSheetId :string) {

		// SpreadSheet読み込み.
		this.scheme = SpreadsheetApp.openById(spreadSheetId);

		// サーバーインスタンスの追加処理.
		this.serverLogic['append'] = (payload: any) => {

			const sheet = this.scheme.getSheetByName('login');
			const lastRow = sheet.getLastRow();
			sheet.appendRow([lastRow, payload.key, payload.uri ]);

			return JSON.stringify({ status: 200 });
		};

		// 登録したサーバー情報の削除.
		this.serverLogic['delete'] = (payload: any) => {
			return JSON.stringify({ status: 200 });
		};

		// 初期設定.
		const defaultSheet = this.scheme.getSheetByName('シート1')
		if (defaultSheet) {
			defaultSheet.setName('login');
		}
	}

	/**
	 * return server list.
	 *
	 * @returns {*}
	 * @memberof LoginServer
	 */
	public Get() : any {
		const sheet = this.scheme.getSheetByName('login')
		const result = this.SpreadSheetToJson(sheet);
		const response = ContentService.createTextOutput();
		response.setMimeType(ContentService.MimeType.JSON);
		response.setContent(result);
		return response;
	}

	/**
	 * % Todo %
	 * post entry.
	 *
	 * Content-Type: application/json
	 * < json format >
	 * request
	 * {
	 *   method: "start", // start, shutdown など.
	 *   /
	 *     Gasではapiのendpointを複数作れないので、このようにpostdataにmethodタイプを作成しておく.
	 *   /
	 *   param: {
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
		const data = JSON.parse(payload.postData.getDataAsString());
		const result = this.serverLogic[data.method](data.param);
		const response = ContentService.createTextOutput();
		response.setMimeType(ContentService.MimeType.JSON);
		response.setContent(result);
		return response;
	}

	// https://qiita.com/taichi0514/items/ee6dedff45f9d9e58ef4
	private SpreadSheetToJson(sheet: GoogleAppsScript.Spreadsheet.Sheet){
		const rows = sheet.getDataRange().getValues();
		const keys = rows.splice(0, 1)[0];
		const data = rows.map( (row) => {
			const obj = {}
			row.map((item, index) => {
				obj[keys[index]] = item;
			});
			return obj;
		});
		return JSON.stringify(data, null, 2);
	}
}

