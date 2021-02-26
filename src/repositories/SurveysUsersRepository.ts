import { EntityRepository, Repository } from "typeorm";
import { UserSurvey } from "../models/UserSurvey";

@EntityRepository(UserSurvey)
class SurveysUsersRepository extends Repository<UserSurvey> { }

export { SurveysUsersRepository }
