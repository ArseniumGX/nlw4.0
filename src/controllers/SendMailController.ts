import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRespository, SurveysUsersRepository, UsersRepository } from '../repositories'
import SendMailService from '../services/SendMailService'

class SendMailController
{
    async execute(req: Request, res: Response)
    {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRespository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email })
        const survey = await surveysRepository.findOne({ id: survey_id })

        if(!user)
            return res.status(400).json("Usuário inexistente!")

        if(!survey)
            return res.status(400).json("Pesquisa não existe!")

        const surveyUser = surveysUsersRepository.create(
            {
                user_id: user.id,
                survey_id
            }
        )

        await surveysUsersRepository.save(surveyUser)

        await SendMailService.execute(email, survey.title, survey.description )

        return res.json(surveyUser)
    }
}

export { SendMailController }