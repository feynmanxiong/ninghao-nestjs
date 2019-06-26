import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dogs } from './dogs.entity';
import { DogsDto } from './dogs.dto';
import { User } from '../user/user.entity';
import { ListOpitonInterface } from '../../core/interfaces/list-opiton.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class DogsService {
    constructor(
        @InjectRepository(Dogs)
        private readonly dogsRepository: Repository<Dogs>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}

    async beforeTag(tags: Partial<Tag>[]){
        const _tags = tags.map(async item => {
            const {id, name} = item;
            if(id) {
                const _tag =await this.tagRepository.findOne(id);               
                if(_tag) {
                    return _tag;
                }
                return;
            }
            if(name) {
                const _tag = await this.tagRepository.findOne({name});
                if(_tag) {
                    return _tag;
                }
                return await this.tagRepository.save(item);
            }
        });
        return  Promise.all(_tags);
    }



    async stroe(data: DogsDto, user: User) {
        const { tags } = data;
        console.log(tags);

        if(tags) {
            data.tags = await this.beforeTag(tags);
        }


        const entity = await this.dogsRepository.create(data);
        await this.dogsRepository.save({
            ...entity,
            user
        });
        return entity;
    }

    async index(options: ListOpitonInterface) {
        const {categories, tags} = options;
        const queryBuilder = await this.dogsRepository.createQueryBuilder('dogs');

        queryBuilder.leftJoinAndSelect('dogs.user', 'user');
        queryBuilder.leftJoinAndSelect('dogs.category', 'category');
        queryBuilder.leftJoinAndSelect('dogs.tags', 'tag');

        if (categories) {
            queryBuilder.where('category.alias in (:...categories)', {categories});
        }
        if (tags){
            queryBuilder.andWhere('tag.name IN (:...tags)', {tags});
        }
        const entites = queryBuilder.getMany();
        return entites;
    }

    async show(id: string) {
        const entity = await this.dogsRepository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<DogsDto>) {

        const { tags } = data;
        delete data.tags;

        await this.dogsRepository.update(id, data);
        const entity = await this.dogsRepository
            .findOne(id, {relations: ['category', 'tags']});
        if (tags) {
            entity.tags = await this.beforeTag(tags);
        }
        return await this.dogsRepository.save(entity);
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
