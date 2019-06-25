import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dogs } from './dogs.entity';
import { DogsDto } from './dogs.dto';
import { User } from '../user/user.entity';
import { ListOpitonInterface } from '../../core/interfaces/list-opiton.interface';

@Injectable()
export class DogsService {
    constructor(
        @InjectRepository(Dogs)
        private readonly dogsRepository: Repository<Dogs>,
    ){}

    // findAll(): Promise<Dogs[]> {
    //     return this.dogsRepository.find();
    // }

    async stroe(data: DogsDto, user: User) {
        const entity = await this.dogsRepository.create(data);
        await this.dogsRepository.save({
            ...entity,
            user
        });
        return entity;
    }

    async index(options: ListOpitonInterface) {
        const {categories} = options;
        const queryBuilder = await this.dogsRepository.createQueryBuilder('dogs');

        queryBuilder.leftJoinAndSelect('dogs.user', 'user');
        queryBuilder.leftJoinAndSelect('dogs.category', 'category');

        if (categories) {
            queryBuilder.where('category.alias in (:...categories)', {categories});
        }

        const entites = queryBuilder.getMany();
        return entites;
    }

    async show(id: string) {
        const entity = await this.dogsRepository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<DogsDto>) {
        const result = await this.dogsRepository.update(id, data);
        return result;
    }

    async destroy(id: string) {
        const result = await this.dogsRepository.delete(id);
        return result;
    }

    async vote(id: number, user: User){
        await this.dogsRepository
            .createQueryBuilder()
            .relation(User, 'voted')
            .of(user)
            .add(id);
    }

    async unVote(id: number, user: User){
        await this.dogsRepository
            .createQueryBuilder()
            .relation(User, 'voted')
            .of(user)
            .remove({ id });
    }

    async liked(id: number){
        return await this.dogsRepository
            .createQueryBuilder()
            .relation(Dogs, 'liked')
            .of(id)
            .loadMany();
    }
}
