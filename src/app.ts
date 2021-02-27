import 'reflect-metadata';

import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors'

import createConnection from "./config/dbConfig";
createConnection();

import { userRouter } from './routes/UsersRoutes'
import { surveyRouter } from './routes/SurveyRoutes';
import { sendmailRouter } from './routes/SendMailRoute'
import { answerRouter } from './routes/AnswerRoutes';
import { npsRouter } from './routes/NpsRoutes';
import { AppError } from './errors/Apperror';



const app = express();

app.use(express.json())
app.use('/users', userRouter);
app.use('/surveys', surveyRouter);
app.use('/sendmail', sendmailRouter);
app.use('/answers', answerRouter)
app.use('/nps', npsRouter);

//tratamento de errors ->
app.use(
    (err: Error, req: Request, res: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json(err.message)
        }

        return res.status(500).json({
            status: "Error",
            message: `Internal Server error ${err.message}`

        })
    }
)


export { app }