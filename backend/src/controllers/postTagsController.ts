import BaseController from './baseController';
import { PostTag } from '../types';

class PostTagsController extends BaseController {
  constructor() {
    super('post_tags');
  }

  async create(postTag: PostTag): Promise<PostTag> {
    const newPostTag: PostTag[] = await this.db(this.table).insert(postTag).returning('*');
    return newPostTag[0];
  }
}

export default new PostTagsController();
