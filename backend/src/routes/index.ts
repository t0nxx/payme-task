import { Router } from 'express';
import UserRouter from './UserRouter';
import ToDoRouter from './ToDoRouter';

const routes = Router();

routes.use('/api/users', UserRouter);
routes.use('/api/todos', ToDoRouter);

export default routes;
