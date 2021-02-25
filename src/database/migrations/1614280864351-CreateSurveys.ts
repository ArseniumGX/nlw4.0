import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614280864351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> 
    {
        queryRunner.createTable(new Table(
            {
                name: "surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> 
    {
        queryRunner.dropTable("surveys")
    }

}
