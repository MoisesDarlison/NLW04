import { Request, Response } from "express";
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/Apperror";
import { SurveysRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailservice from "../services/SendMailservice";
const { URL_MAIL } = process.env


class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const userAlreadyExists = await userRepository.findOne({ email })

        if (!userAlreadyExists) {
            throw new AppError("User does not exists!")
        }

        const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id })

        if (!surveyAlreadyExists) {
            throw new AppError("Survey does not exists!")
        }

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: { user_id: userAlreadyExists.id, value: null, survey_id: surveyAlreadyExists.id },
            relations: ["user", "survey"]
        })

        //gerara dados do email
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsEmails.hbs")
        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: "",//crio ela vazia para depois add
            link: URL_MAIL
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id; //add id a variebles
            await SendMailservice.execute(email, surveyAlreadyExists.title, variables, npsPath);

            return res.status(200).json(surveyUserAlreadyExists)
        }


        //salvas as info na table SurveyUser
        const surveyUser = surveyUserRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        })

        await surveyUserRepository.save(surveyUser)
        variables.id = surveyUser.id;
        await SendMailservice.execute(email, surveyAlreadyExists.title, variables, npsPath);

        return res.status(200).json(surveyUser)
    }

}

export { SendMailController };

