import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Dogs } from "../dogs/dogs.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 191, unique: true })
    name: string;

    @Column({ length: 191, unique: true, nullable: true })
    alias: string;

    @ManyToMany(type => Dogs, dogs => dogs.tags)
    dogs: Dogs[]

}