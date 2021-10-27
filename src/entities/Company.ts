import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("companies")
export class Company {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    cnpj: string;

    @Column()
    corporate_name: string;

    @Column()
    fantasy_name: string;

    @Column()
    active: boolean;

    @Column()
    company_type: number;

    @CreateDateColumn()
    created_ad: Date;

    @CreateDateColumn()
    updated_ad: Date;
}
