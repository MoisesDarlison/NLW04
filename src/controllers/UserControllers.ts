import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import * as yup from 'yup'
import { AppError } from '../errors/Apperror';


class UserController {
    async create(req: Request, res: Response) {

        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é Obrigatorio!"),
            email: yup.string().email().required("Email é Obrigatorio!")
        });

        /**
         * Validate data Users, 
         * 
         * AbortEarly garante que ele ira tentar validar todos para depois informar
         * os nao validados
         */
        try { 
            await schema.validate(req.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        const userRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            throw new AppError("User already exists!")
        }

        const user = userRepository.create({ name, email });

        await userRepository.save(user);

        return res.status(201).json(user);
    }
}
export { UserController };
