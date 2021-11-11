import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Company } from "./Company";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    company_id: number;

    @JoinColumn({ name: "company_id" })
    @ManyToOne(() => Company)
    company: Company;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    access_level: number;

    @Column()
    active: boolean;

    @CreateDateColumn()
    created_ad: Date;

    @CreateDateColumn()
    updated_ad: Date;

}
