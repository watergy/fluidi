import BaseController from './baseController';
import { Tag, TagToCreate } from '../types';

class TagsController extends BaseController {
  constructor() {
    super('tags');
  }

  async create(tag: TagToCreate): Promise<Tag> {
    const newTag: Tag[] = await this.db(this.table).insert(tag).returning('*');
    return newTag[0];
  }
}

export default new TagsController();
