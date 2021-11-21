import BaseController from './baseController';
import PostTags from './postTagsController';
import Tags from './tagsController';
import { Post, PostToCreate, Tag, PostTag } from '../types';

const getTagName = async (postTag: PostTag) => {
  const foundTag = await Tags.findOne({ id: postTag.tag_id });
  return foundTag.name;
};

const getTagNames = async (postTags: PostTag[]) => {
  return Promise.all(postTags.map(postTag => getTagName(postTag)));
};

const addTagsToPost = async (post: Post) => {
  const response = { ...post };
  const foundTags = await PostTags.findBy({ post_id: post.id });
  if (!foundTags || foundTags.length === 0) {
    return response;
  }
  const tagNames = await getTagNames(foundTags);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  response['tags'] = tagNames;
  return response;
};

const getFullPosts = async (posts: Post[]) => {
  return Promise.all(posts.map(post => addTagsToPost(post)));
};

class PostsController extends BaseController {
  constructor() {
    super('posts');
  }

  async create(post: PostToCreate): Promise<Post> {
    const newPost: Post[] = await this.db(this.table).insert(post).returning('*');
    return newPost[0];
  }

  async getAllPosts() {
    const posts = await this.findAll(async (allPosts: Post[]) => {
      const response = await getFullPosts(allPosts);
      return response;
    });
    return posts;
  }
}

export default new PostsController();
