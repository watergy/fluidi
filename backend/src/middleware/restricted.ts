import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { BadRequest, Forbidden } from '../httpErrors';

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

const restricted: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Forbidden('No JWT found, access denied.');
    } else {
      jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
          throw new BadRequest('Invalid JWT');
        } else {
          res.locals.jwt = decodedToken;
          next();
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

export default restricted;
