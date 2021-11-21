import { RequestHandler } from 'express';
import { BadRequest } from '../httpErrors';
import { UserNewInput } from '../types';

const ensureUserSchema: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (Object.keys(req.body).length === 0 || !username || !password) {
      throw new BadRequest('Request must include username and password');
    } else if (typeof username !== 'string') {
      throw new BadRequest('username must be a string');
    } else if (typeof password !== 'string') {
      throw new BadRequest('password must be a string');
    } else {
      const user: UserNewInput = {
        username,
        password,
      };
      res.locals.newUser = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export { ensureUserSchema };
