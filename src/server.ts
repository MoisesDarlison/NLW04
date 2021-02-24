import 'reflect-metadata';
import "./config/dbConfig";

import express from 'express';

import { userRouter } from './routes/UsersRoutes'

const app = express();
const PORT = process.env.PORT || 3333;



app.use(express.json())
app.use('/users', userRouter);


app.listen(PORT, () => console.log(`Running in port ${PORT}`))
