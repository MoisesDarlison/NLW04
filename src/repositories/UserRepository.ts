import { EntityRepository, Repository } from "typeorm";
import { UserMoldel } from "../models/UserModel";

@EntityRepository(UserMoldel)
class UsersRepository extends Repository<UserMoldel>{

}
export { UsersRepository };
