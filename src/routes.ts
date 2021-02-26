import { Router } from 'express'
import { userController, surveyController, sendMailController } from './controllers/'

const router = Router()

router.post('/users', userController.create)
router.get('/users', userController.show)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

router.post('/sendMail', sendMailController.execute)

export { router }