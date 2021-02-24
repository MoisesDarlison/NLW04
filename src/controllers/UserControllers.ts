import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { UserMoldel } from '../models/UserModel'

class UserController {
    async create(req: Request, res: Response) {
       
       
        const { name, email } = req.body;
        try {
            const userRepository = getRepository(UserMoldel);
            const userAlreadyExists = await userRepository.findOne({email});

            if(userAlreadyExists){
                return res.status(400).json({
                    error: "User already exists!"
                })
            }

            const user = userRepository.create({ name, email });
    
            await userRepository.save(user);
            return res.json(user);
        } catch (error) {
            return res.json(error)
        }
    }
}
export { UserController };