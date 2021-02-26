import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity("surveys_users")

class UserSurvey
{
    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    survey_id: string

    @Column()
    value: Number

    @CreateDateColumn()
    created_at: Date

    constructor()
    {
        if(!this.id)
            this.id = uuid()
    }
}

export { UserSurvey }