import db from '../db/dbConfig';

class Controller {
  db = db;
  table: string;

  constructor(table: string) {
    this.table = table; // table name for db table
  }

  async findAll(cb?: (...args: any) => any) {
    const all = await this.db(this.table);
    return cb ? cb(all) : all;
  }

  findOne(queryObj: Record<string, unknown>) {
    return this.db(this.table).where(queryObj).first();
  }

  findBy(queryObj: Record<string, unknown>) {
    return this.db(this.table).where(queryObj);
  }

  remove(id: number) {
    return this.db(this.table).where({ id }).del();
  }
}

export default Controller;
