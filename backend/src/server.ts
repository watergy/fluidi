import express, { Express } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import UsersRouter from './routers/usersRouter';
import PostsRouter from './routers/postsRouter';
import cors from 'cors';
dotenv.config();

const app: Express = express();
const server: http.Server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server is up and running...');
});

app.use('/users', UsersRouter);
app.use('/posts', PostsRouter);

app.use(errorHandler);

export default server;
