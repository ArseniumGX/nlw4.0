import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

class UserController
{
    async create(req: Request, res: Response)
    {
        const { name, email } = req.body
        const usersRepository = getRepository(User)

        // SELECT * FROM 'users' WHERE email = 'email'
        const usersAlreadyExists = await usersRepository.findOne(
            {
                email
            }
        )

        if(usersAlreadyExists)
            return res.status(400).json({ 
                error: "Usuário ja existe!"
             })

        const user = usersRepository.create(
        {
            name, 
            email 
        })

        try{ await usersRepository.save(user) } catch(e) { console.warn(`Error: ${e}`) }


        return res.json(user)
    }
}

export { UserController }