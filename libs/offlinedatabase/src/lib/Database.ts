import { Injectable } from '@angular/core';
import { OfflineDB } from '@dilta/models/src/rxdb/models';
import { Remote } from 'electron';
import { Observable } from 'rxjs/observable';

/**
 * Holder for the database for depenedcy injection
 *
 * @export
 * @class Database
 */
@Injectable()
export class Database {
  private readonly _db: [Error, Observable<OfflineDB>] = (window['require'](
    'electron'
  ).remote as Remote).getGlobal('_databaseInit');
  public db: Observable<OfflineDB>;
  constructor() {
    if (this._db[0]) {
      throw this._db[0];
    }
    this.db = this._db[1];
  }
}

function isElectron() {
  return window['process'] && window['require'];
}
