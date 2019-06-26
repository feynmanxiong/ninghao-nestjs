import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dogs } from '../dogs/dogs.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    alias: string;

    @OneToMany(type => Dogs, dogs => dogs.category)
    dog: Dogs[];
}