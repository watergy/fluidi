import express from 'express';
import Users from '../controllers/usersController';
import { UserToSend } from '../types';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await Users.findAll();
    const usersClean = [...users];
    usersClean.forEach((user: UserToSend) => delete user.password);
    res.status(200).json(usersClean);
  } catch (err) {
    next(err);
  }
});

export default router;
