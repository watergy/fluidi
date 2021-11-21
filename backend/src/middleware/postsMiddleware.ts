import { RequestHandler } from 'express';
import { BadRequest, NotFound } from '../httpErrors';
import { PostNew } from '../types';
import { v4 as uuid } from 'uuid';
import Users from '../controllers/usersController';
import Tags from '../controllers/tagsController';

const getTagId = async (tag: string) => {
  const foundTag = await Tags.findOne({ name: tag });
  if (foundTag) return foundTag.id;
  const newTag = await Tags.create({ name: tag, id: uuid() });
  return newTag.id;
};

const getAllTagIds = async (tags: string[]) => {
  return Promise.all(tags.map(tag => getTagId(tag)));
};

const ensurePostSchema: RequestHandler = async (req, res, next) => {
  console.log('incoming request to create post', req.body);

  try {
    const { title, body, enc_public_key, tags } = req.body;

    if (Object.keys(req.body).length === 0 || !title || !body || !enc_public_key) {
      throw new BadRequest('Request must include title, body, and enc_public_key');
    } else if (typeof title !== 'string') {
      throw new BadRequest('title must be a string');
    } else if (typeof body !== 'string') {
      throw new BadRequest('body must be a string');
    } else if (typeof enc_public_key !== 'string') {
      throw new BadRequest('enc_public_key must be a string');
    }

    const foundUser = await Users.findOne({ enc_public_key });
    if (!foundUser) {
      throw new NotFound(`user not found`);
    }
    if (tags && typeof tags === 'object' && tags.length > 0) {
      const tagIds = await getAllTagIds(tags);
      res.locals.tagIds = tagIds;
    }
    const post: PostNew = { title, body, user_id: foundUser.id };
    res.locals.newPost = post;
    next();
  } catch (err) {
    next(err);
  }
};

export { ensurePostSchema };
