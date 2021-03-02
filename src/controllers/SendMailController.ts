import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { resolve } from 'path'
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
        const surveyUserExists = await surveysUsersRepository.findOne( {
            where: [ { user_id: user.id }, { value: null } ],
            relations: ["user", "survey"]
        })
        
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        if(!user)
            return res.status(400).json("Usuário inexistente!")

        if(!survey)
            return res.status(400).json("Pesquisa não existe!")

        if(surveyUserExists)
        {
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return res.json(surveyUserExists)
        }

        const surveyUser = surveysUsersRepository.create(
            {
                user_id: user.id,
                survey_id
            }
        )

        

        await surveysUsersRepository.save(surveyUser)

        await SendMailService.execute(email, survey.title, variables, npsPath )

        return res.json(surveyUser)
    }
}

export { SendMailController }