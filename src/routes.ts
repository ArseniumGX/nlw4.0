import { Router } from 'express'
import { userController, surveyController } from './controllers/'

const router = Router()

router.post('/users', userController.create)
router.get('/users', userController.show)

router.post('/surveys', surveyController.create)
router.get('/surveys', surveyController.show)

export { router }