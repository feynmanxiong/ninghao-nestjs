import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';



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

  @ManyToOne(type => Category, category => category.dog)
  category: Category;

  @ManyToMany(type => Tag, tags => tags.dogs)
  @JoinTable()
  tags: Tag[];

  @OneToMany(type => Comment, comment => comment.dogs )
  comments: Comment[];

}