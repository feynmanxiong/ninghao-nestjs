import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ){}

    async storeDogsComment(id: number, user: User, data: CommentDto){
        console.log(id)
        console.log(user);
        console.log(data);
      
        return await this.commentRepository.save({
            user,
            ...data,
            dogs: { id }
            
        })
    }

    async update(id: number, data: CommentDto){
        return await this.commentRepository.update(id, data);
    }

    async destroy(id: number){
        return await this.commentRepository.delete(id);
    }

    async showDogsComments(id: number){
        return await this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user','user')
            .leftJoinAndSelect('comment.dogs', 'dogs')
            .where('dogs.id = :id', {id})
            .getMany()

    }

    async showUserComments(id: number){
        return await this.commentRepository
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user','user')
            .leftJoinAndSelect('comment.dogs', 'dogs')
            .where('user.id = :id', {id})
            .getMany()

    }
}
