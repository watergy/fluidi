import express from 'express';
import Posts from '../controllers/postsController';
import PostTags from '../controllers/postTagsController';
import { Post, PostToCreate, PostResponse } from '../types';
import { v4 as uuid } from 'uuid';
import { ensurePostSchema } from '../middleware/postsMiddleware';

const router = express.Router();

router.post('/new', ensurePostSchema, async (req, res, next) => {
  try {
    const post = res.locals.newPost;
    const postToCreate: PostToCreate = {
      title: post.title,
      user_id: post.user_id,
      body: post.body,
      id: uuid(),
    };
    const newPost: Post = await Posts.create(postToCreate);
    if (res.locals.tagIds) {
      await res.locals.tagIds.map(async (tagId: string) => {
        await PostTags.create({ id: uuid(), post_id: newPost.id, tag_id: tagId });
      });
    }
    const response: PostResponse = { ...newPost };
    if (res.locals.tagIds) response['tags'] = req.body.tags;
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const posts = await Posts.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

export default router;
