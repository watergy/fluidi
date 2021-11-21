import express from 'express';
import Users from '../controllers/usersController';
import { User, UserToInsert, UserToSend } from '../types';
// import { v4 as uuid } from 'uuid';
import { ensureUserSchema, validateUser } from '../middleware/usersMiddleware';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

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

router.post('/register', ensureUserSchema, async (_req, res, next) => {
  try {
    const user = res.locals.user;
    const hash = bcrypt.hashSync(user.password);
    const userToCreate: UserToInsert = {
      username: user.username,
      password: hash,
    };
    const newUser: User = await Users.create(userToCreate);
    const token = generateToken(newUser);
    const userToSend: UserToSend = { ...newUser };
    delete userToSend.password;
    res.status(201).json({
      user: userToSend,
      token,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', ensureUserSchema, validateUser, async (_req, res, next) => {
  try {
    const user = res.locals.foundUser;
    const token = generateToken(user);
    const userToSend: UserToSend = { ...user };
    delete userToSend.password;
    res.status(200).json({ user: userToSend, token });
  } catch (err) {
    next(err);
  }
});

function generateToken(user: User) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1w',
  };
  return jwt.sign(payload, SECRET, options);
}

export default router;
