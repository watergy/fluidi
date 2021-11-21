import BaseController from './baseController';
import { User, UserToInsert } from '../types';

class UsersController extends BaseController {
  constructor() {
    super('users');
  }

  async create(user: UserToInsert): Promise<User> {
    const newUser: User[] = await this.db(this.table).insert(user).returning('*');
    return newUser[0];
  }
}

export default new UsersController();
