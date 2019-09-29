import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();

// router.get('/', userController.all);

router.post('/login', userController.login);

router.post('/register', userController.add);

// router.delete('/:id', userController.remove);

export default router;
