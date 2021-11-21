import express from 'express';
import Users from '../controllers/usersController';
import { User, UserToCreate } from '../types';
import { v4 as uuid } from 'uuid';
import { ensureUserSchema } from '../middleware/usersMiddleware';

const router = express.Router();

router.post('/register', ensureUserSchema, async (_req, res, next) => {
  try {
    const user = res.locals.newUser;
    const userToCreate: UserToCreate = {
      username: user.username,
      id: uuid(),
    };
    const newUser: User = await Users.create(userToCreate);
    console.log('creating new user', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
