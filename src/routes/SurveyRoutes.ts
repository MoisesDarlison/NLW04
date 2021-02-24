import { Router } from 'express';
import { SurveysController } from '../controllers/SurveysController'

const surveyRouter = Router();
const surveyController = new SurveysController();

surveyRouter.get('/',surveyController.show)
surveyRouter.post('/',surveyController.create)


export { surveyRouter }

