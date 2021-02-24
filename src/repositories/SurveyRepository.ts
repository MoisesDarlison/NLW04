import { EntityRepository, Repository } from "typeorm";
import { SurveyModal } from "../models/SurveyModal";

@EntityRepository(SurveyModal)
class SurveysRepository extends Repository<SurveyModal>{

}
export { SurveysRepository };
