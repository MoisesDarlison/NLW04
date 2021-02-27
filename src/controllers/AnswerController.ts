import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/Apperror";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";


class AnswerController {
    async execute(req: Request, res: Response) {
        const { value } = req.params;
        const { u } = req.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            id: String(u)
        });

        if (!surveyUserAlreadyExists) {
            throw new AppError("Survey User does ot exists!")
        }
        surveyUserAlreadyExists.value = Number(value)

        await surveyUserRepository.save(surveyUserAlreadyExists)

        return res.status(200).json(surveyUserAlreadyExists)
    }
}
export { AnswerController };

