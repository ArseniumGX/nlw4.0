import { UserController } from './userController'
import { SurveyController } from './surveyController'
import { SendMailController } from './SendMailController'

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()


export { userController , surveyController , sendMailController }