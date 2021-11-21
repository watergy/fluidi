import { RequestHandler } from 'express';
import { BadRequest } from '../httpErrors';
import { UserNew } from '../types';

const ensureUserSchema: RequestHandler = async (req, res, next) => {
  console.log('incoming request to create user', req.body);

  try {
    const { username } = req.body;

    if (Object.keys(req.body).length === 0 || !username) {
      throw new BadRequest('Request must include username');
    } else if (typeof username !== 'string') throw new BadRequest('username must be a string');
    else {
      const user: UserNew = {
        username,
      };
      res.locals.newUser = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export { ensureUserSchema };
