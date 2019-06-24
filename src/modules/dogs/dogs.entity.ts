import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';


@Entity()
export class Dogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext', { nullable: true})
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.dog)
  user: User;

  @ManyToMany(type => User, user => user.voted)
  liked: User[];


}