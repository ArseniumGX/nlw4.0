import { MigrationInterface, QueryRunner, Table } from "typeorm";

/*
 *
 *
*/

export class CreateUsers1614210553583 implements MigrationInterface {

    /* Método sobe o tabela */
    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.createTable(new Table(
            {
                /* Cria uma tabela users no banco com 4 colunas (id: uuid, name: varchar, email: varchar, createdAt: timestamp) 
                   Os tipos de cada campo passado é o tipo que estabelecido pelo database, varia de acordo com o database escolhido
                */
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        /* coluna createAt, assim como a id, o proprio database vai tratar essas informações de forma automatizada */
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    /* Método derruba a tabela criada do database */
    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        await queryRunner.dropTable("user")
    }

}
