import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("companies")
export class Company {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    cnpj: string;

    @Column()
    corporate_name: string;

    @Column()
    fantasy_name: string;

    @Column()
    active: boolean;

    @Column()
    company_type: bigint;

    @CreateDateColumn()
    created_ad: Date;

    @CreateDateColumn()
    updated_ad: Date;
}
