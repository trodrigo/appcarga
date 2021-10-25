import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1635131002544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "company_id",
                        type: "integer"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar(200)"
                    },
                    {
                        name: "name",
                        type: "varchar(200)"
                    },
                    {
                        name: "access_level",
                        type: "integer",
                        default: 4
                    },
                    {
                        name: "active",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_ad",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_ad",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCompanyUser",
                        referencedTableName: "companies",
                        referencedColumnNames: ["id"],
                        columnNames: ["company_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
