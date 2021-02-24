import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveyRepository";

class SurveysController {
    async create(req: Request, res: Response) {
        const {title ,description} = req.body;

        const surveyRespository = getCustomRepository(SurveysRepository);
        const survey = await surveyRespository.create({
            title,
            description
        });

        await surveyRespository.save(survey)

        res.status(201).json(survey)
    }
    async show(req: Request, res: Response){
        const surveyRespository = getCustomRepository(SurveysRepository);
        const allSurveys = await  surveyRespository.find();

        res.status(200).json(allSurveys)
    }
}
export { SurveysController }