import { Router } from 'express';
import { UserController } from '../controllers/UserControllers'

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create)

export { userRouter }

