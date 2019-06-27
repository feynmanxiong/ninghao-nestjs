import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Dogs } from "../dogs/dogs.entity";
import { User } from "../user/user.entity";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string;

    @Column()
    body: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToOne(type => Dogs, dogs => dogs.comments, { nullable: false })
    dogs: Dogs;

    @ManyToOne(type => User, user => user.comments, { nullable: false })
    user: User;
}