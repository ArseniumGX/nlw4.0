import { Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRespository } from '../repositories'

class SurveyController
{
    // Método create -- Requisição HTTP pelo metodo POST
    async create(req: Request, res: Response)
    {
        const { title, description} = req.body
        const surveyRepository = getCustomRepository(SurveysRespository)

        const survey = surveyRepository.create(
            {
                title, 
                description
            }
        )

        await surveyRepository.save(survey)

        return res.status(201).json(survey)
    }

    // Método show -- 
    async show(req: Request, res: Response)
    {
        const surveyRepository = getCustomRepository(SurveysRespository)
        const all = await surveyRepository.find()

        return res.status(200).json(all)
    }
}

export { SurveyController }