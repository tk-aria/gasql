"use strict";

/**
 *
 *
 * @export
 * @class gasql
 */
export default class gasql {

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
   * @memberof LoginServer
   */
  private sheet!: GoogleAppsScript.Spreadsheet.Sheet | null;

  public constructor(id: string) {
    this.connect(id);
  }

  public connect(id: string) {
    this.clear();
    this.scheme = SpreadsheetApp.openById(id);
  }

  public close() {
    this.clear();
  }

  public open(table: string) {
    return this.sheet = this.scheme.getSheetByName(table);
  }

  public data() {
    if (this.sheet!.getLastRow() <= 1 || this.sheet!.getLastColumn() <= 0) {
      return [];
    }
    return this.sheet!.getSheetValues(2, 1, this.sheet!.getLastRow() - 1, this.sheet!.getLastColumn());
  }

  public run(query: string, callback:(err: string, row: any, col: any)=> void){

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