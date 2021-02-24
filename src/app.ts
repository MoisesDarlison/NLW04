import 'reflect-metadata';

import express from 'express';

import createConnection from "./config/dbConfig";
import { userRouter } from './routes/UsersRoutes'
import { surveyRouter} from './routes/SurveyRoutes';

createConnection();
const app = express();

app.use(express.json())
app.use('/users', userRouter);
app.use('/surveys', surveyRouter);

export {app}