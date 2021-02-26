import { Router } from 'express';
import { SendMailController } from '../controllers/SendMailController'

const sendmailRouter = Router();
const sendmailController = new SendMailController();

sendmailRouter.post('/', sendmailController.execute)

export { sendmailRouter }
