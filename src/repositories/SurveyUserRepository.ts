import { EntityRepository, Repository } from "typeorm";
import { SurveyUserModal } from "../models/SurvayUserModal";

@EntityRepository(SurveyUserModal)
class SurveyUserRepository extends Repository<SurveyUserModal>{

}
export { SurveyUserRepository };
