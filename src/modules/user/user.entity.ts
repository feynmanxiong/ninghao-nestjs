import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Dogs } from '../dogs/dogs.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 191, unique: true})
  name: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Dogs, dogs => dogs.user)
  dog: Dogs[]

  @ManyToMany(type => Dogs, dogs => dogs.liked)
  @JoinTable()
  voted: Dogs[]

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string){
    return await bcrypt.compare(password, this.password);
  }

}