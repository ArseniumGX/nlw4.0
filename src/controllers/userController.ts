import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories'

class UserController
{
    /* Método cria a requisição */
    async create(req: Request, res: Response)
    {
        const { name, email } = req.body
        const usersRepository = getCustomRepository(UsersRepository) // Faz mapeamento da tabela

        /* 
          SELECT * FROM 'users' WHERE email = 'email'
          Variável armazena o valor do método
        */
        const usersAlreadyExists = await usersRepository.findOne(
            {
                email
            }
        )


        /* Testa se usuário ja existe */
        if(usersAlreadyExists)
            return res.status(400).json({ 
                error: "Usuário ja existe!"
            })


        /* Cria um novo repositório passando o nome e email da requisição do body */
        const user = usersRepository.create(
        {
            name, 
            email 
        })

        /* Método salva as as informações no banco */
        await usersRepository.save(user)
        
        /*
        // Statement usado para testar um problema durando a gravação que estava acontecendo no save das informaçãos
        try{
            await usersRepository.save(user)
        } catch(e){
            console.warn(`Error: ${e}`)
        }
        */

        /* envia a uma responsta em json das informações salvas em banco */
        return res.status(201).json(user)
    }

    async show(req: Request, res: Response)
    {
        const user = getCustomRepository(UsersRepository)

        const all = await user.find()
        res.status(200).json(all)
    }
}


export { UserController }