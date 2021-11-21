import { RequestHandler } from 'express';
import { BadRequest, NotFound } from '../httpErrors';
import { UserNewInput } from '../types';
import Users from '../controllers/usersController';
import bcrypt from 'bcryptjs';

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
      res.locals.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const foundUser = await Users.findOne({ username: user.username });
    if (!foundUser) {
      throw new NotFound(`User with username:${user.username} not found.`);
    } else if (bcrypt.compareSync(user.password, foundUser.password)) {
      res.locals.foundUser = foundUser;
      next();
    } else {
      throw new BadRequest('Invalid credentials');
    }
  } catch (err) {
    next(err);
  }
};

export { ensureUserSchema, validateUser };
