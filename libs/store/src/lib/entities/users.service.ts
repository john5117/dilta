import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { User } from '@dilta/models';
import { UserModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { map } from 'rxjs/operators';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityDataBase } from '@dilta/store/src/lib/entities/entitybase';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class UserDataService
 * @extends {EntityDataBase<User>}
 */
@Injectable()
export class UserDataService extends EntityDataBase<User> {
  constructor(@Inject(UserModel) service: Model<User>) {
    super(EntityNames.User, service);
  }

  /**
   * retrieves the user details with authId
   *
   * @param {string} authId
   * @returns
   * @memberof UserDataService
   */
  getWithAuthId(authId: string) {
    return this.getWithQuery({ authId }).pipe(map(auths => auths[0]));
  }
}

/**
 * Service responsible for creating User Entity
 *
 * @export
 * @class UserService
 * @extends {EntityServiceBase<User>}
 */
@Injectable()
export class UserService extends EntityServiceBase<User> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.User, entityServiceFactory);
  }
}
