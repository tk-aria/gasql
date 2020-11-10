"use strict";

/**
 *
 *
 * @export
 * @class Gasql
 */
export default class Gasql {

  /**
   *
   *
   * @private
   * @type {GoogleAppsScript.Spreadsheet.Spreadsheet}
   * @memberof gasql
   */
  private scheme!: GoogleAppsScript.Spreadsheet.Spreadsheet;

  /**
   * read/writable sheet.
   *
   * @protected
   * @type {GoogleAppsScript.Spreadsheet.SpreadsheetApp}
   * @memberof Gasql
   */
  private sheet!: GoogleAppsScript.Spreadsheet.Sheet | null;

  public constructor(id: string) {
    this.connect(id);
  }

  /**
   *
   * @param id
   */
  public connect(id: string) {
    this.clear();
    this.scheme = SpreadsheetApp.openById(id);
  }

  /**
   *
   *
   * @memberof Gasql
   */
  public close() {
    this.clear();
  }

  /**
   *
   *
   * @param {string} table
   * @returns
   * @memberof Gasql
   */
  public open(table: string) {
    return this.sheet = this.scheme.getSheetByName(table);
  }

  /**
   *
   *
   * @returns
   * @memberof Gasql
   */
  public data(): any[][] {
    if (this.sheet!.getLastRow() <= 1 || this.sheet!.getLastColumn() <= 0) {
      return [];
    }
    return this.sheet!.getSheetValues(2, 1, this.sheet!.getLastRow() - 1, this.sheet!.getLastColumn());
  }

  /**
   *
   *
   * @returns
   * @memberof Gasql
   */
  public to_object (): any[] {
    const datas: any[][] = this.sheet.getDataRange().getValues();
    const head = datas.shift();

    const arr = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < datas.length; i++) {

      const obj = {};

      for (let j = 0; j < head.length; j++) {
        obj[head[j]] = datas[i][j];
      }

      arr.push(obj);
    }

    Logger.log(arr);

    return arr;

    //const items = datas.map(row => {
    //  return row.reduce((acc, r, idx) => {
    //    acc[head[idx]] = r;
    //    return acc;
    //  }, {})
    //})
    //return items
  }

// insert/inserts https://tonari-it.com/gas-array-push-append/
// insert(任意) https://tonari-it.com/gas-spreadsheet-insertrows-splice/
// delete https://tonari-it.com/gas-spreadsheet-delete-rows-splice/

  public insert(record: any[]) {
    this.sheet.appendRow(record);
  }

  public delete(recordId: number, records:number = 1) {
    this.sheet.deleteRows(recordId, records);
  }

  public run(query: string, callback:(err: string, row: any, col: any) => void){

  }

  private clear() {
    console.log("");
  }
}

/*
namespace gasql {

  export function Connect(): Database{

  }
}

interface Database {

  public Create(): Table {
  }
}

interface Table {

}

Record

Column
*/

function test_gasql() {
  let gasql = new Gasql('1FWiMkYXrfStIaLQCh2z6N0PnQPYbeSCjA1eYB4U8BgU');
  let table = gasql.open('AssetMaster');
  var res = gasql.data();
  Logger.log('data: '+ res);
}
