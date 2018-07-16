import { SettingModel } from '@dilta/models/src/rxdb/setting.model';
import { throwError } from '@dilta/screwbox';
import { LoggerService } from '@dilta/util';
import { to } from 'await-to-js';
import * as RxDB from 'rxdb';
import { RxCollection, RxDatabase, RxSchema } from 'rxdb';
import { authModel } from './auth.model';
import { ExpenseModel } from './expense.model';
import { managerModel } from './manager.model';
import { Auth, Manager, Parent, Receipt, School, Score, Settings, Student, User } from './models';
import { parentModel } from './parent.model';
import { receiptModel } from './receipt.model';
import { schoolModel } from './school.model';
import { studentModel } from './student.model';
import { subjectModel } from './subject.model';
import { userModel } from './user.model';


const { debug, info } = new LoggerService('@dilta/models');

/** the database name for rxdb */
const DB_NAME = 'carddemodb';


/** collection configurations to be created on the database */
export const Kollections = [
  authModel,
  managerModel,
  parentModel,
  receiptModel,
  schoolModel,
  studentModel,
  subjectModel,
  userModel,
  SettingModel,
  ExpenseModel
];

/**
 * interface mapping the mainframe object to its key value type info
 *
 * @interface DBKollections
 */
export interface DBKollections extends RxDatabase {
  auth: RxCollection<Auth>;
  manager: RxCollection<Manager>;
  parent: RxCollection<Parent>;
  receipt: RxCollection<Receipt>;
  school: RxCollection<School>;
  student: RxCollection<Student>;
  score: RxCollection<Score>;
  user: RxCollection<User>;
  setting: RxCollection<Settings>;
}

/**
 * returns the intialized database connections
 *
 * @export
 * @param {string} DB_ADAPTER storage adapter
 * @param {*} [options={}] options to be passed to pouchdb
 * @param {any[]} [plugins] Arrays of pouchdb plugins
 * @returns {Promise<DBKollections>}
 */
export async function mainframe(DB_ADAPTER: string, options = {}, plugins?: any[]): Promise<DBKollections> {
  applyPlugins(plugins);
  let db: RxDatabase, err: Error;
  [err, db] = await to<RxDatabase, Error>(
    RxDB.create({
      name: DB_NAME,
      adapter: DB_ADAPTER,
      pouchSettings: options
    })
  );
  throwError(err);
  debug({ message: `finshed intializing the database`, trace: 'setup::mainframe'  });
  [err] = await to(initalizeKolls(db, Kollections));
  throwError(err);
  return db as any;
}

/**
 * the configuration interface for creating collections on the database
 *
 * @export
 * @interface CollectionConfig
 */
export interface CollectionConfig<T> {
  /**
   * the name of the collection is key
   *
   * @type {string}
   * @memberof CollectionConfig
   */
  name: string;
  /**
   * the optional collection name in the database
   * defaulted to name if ommitted
   *
   * @type {string}
   * @memberof CollectionConfig
   */
  collection?: string;
  /**
   * the schema of the collection to be created
   *
   * @type {RxSchema}
   * @memberof CollectionConfig
   */
  schema: T;
}

/**
 * it creates new collections from the array of configurations given
 * to it.
 *
 * @param {RxDatabase} db an intialize database
 * @param {CollectionConfig[]} configs kollection configurations to be created on the db
 * @returns an object containing the kollections
 */
export async function initalizeKolls(
  db: RxDatabase,
  configs: CollectionConfig<any>[]
) {
  if (!configs.length || configs.length < 1) {
    throw configsError;
  }
  for (const config of configs) {
    const [err] = await to(
      db.collection({
        name: config.collection || config.name,
        schema: config.schema
      })
    );
    throwError(err);
    debug({ message: `added ${config.name} collection to the database`, trace: 'setup::initalizeKolls'  });
  }
}

export function applyPlugins(plugins: any[]) {
  if (plugins) {
    plugins.forEach(RxDB.plugin);
  }
  info({ message: `setup:::mainframe: intialize rxdb plugins`, trace: 'setup::applyPlugins'  });
}

/** throws error for empty of undefined config */
export const configsError = new Error(`configs array for intializing database collections
 cannot be empty or undefined.
`);
