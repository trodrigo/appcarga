import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    access_level: bigint;

    @Column()
    active: boolean;

    @CreateDateColumn()
    created_ad: Date;

    @CreateDateColumn()
    updated_ad: Date;

}

export { User };
