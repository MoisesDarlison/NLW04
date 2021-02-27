import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";


class NpsController {
    async execute(req: Request, res: Response) {
        const { survey_id } = req.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find(
            { survey_id }
        )

        const detractor = surveysUsers.filter(survey => {
            if (survey.value >= 0 && survey.value <= 6) {
                return true
            }
        }).length;

        const promoters = surveysUsers.filter(survey => {
            if (survey.value >= 9 && survey.value <= 10) {
                return true
            }
        }).length;

        const passivos = surveysUsers.filter(survey => {
            if (survey.value >= 7 && survey.value <= 8) {
                return true
            }
        }).length;


        const totalInvalids = surveysUsers.filter(survey => {
            if (survey.value <= 0 || survey.value > 10) {
                return true
            }
        }).length;

        const totalAnswer = surveysUsers.length;

        const calculate = Number(((promoters - detractor) / totalAnswer) * 100).toFixed(2)

        return res.status(200).json({
            detractor,
            passivos,
            promoters,
            totalAnswer,
            totalInvalids,
            NPS: calculate
        })
    }
}
export { NpsController }