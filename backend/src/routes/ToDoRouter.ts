import { Router } from 'express';
import { ToDoController } from '../controller/ToDoController';
import AuthMiddleWare from '../middleware/Auth';

const router = Router();
const toDoController = new ToDoController();

router.get('/', AuthMiddleWare, toDoController.all);

router.post('/', AuthMiddleWare, toDoController.add);

router.put('/:id', AuthMiddleWare, toDoController.update);

router.delete('/:id', AuthMiddleWare, toDoController.remove);

export default router;
