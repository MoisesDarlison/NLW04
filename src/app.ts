import 'reflect-metadata';

import express from 'express';

import createConnection from "./config/dbConfig";
createConnection();

import { userRouter } from './routes/UsersRoutes'
import { surveyRouter} from './routes/SurveyRoutes';
import { sendmailRouter } from './routes/SendMailRoute'

const app = express();

app.use(express.json())
app.use('/users', userRouter);
app.use('/surveys', surveyRouter);
app.use('/sendmail',sendmailRouter);


export {app}