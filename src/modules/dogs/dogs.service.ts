import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dogs } from './dogs.entity';
import { DogsDto } from './dogs.dto';

@Injectable()
export class DogsService {
    constructor(
        @InjectRepository(Dogs)
        private readonly dogsRepository: Repository<Dogs>,
    ){}

    findAll(): Promise<Dogs[]> {
        return this.dogsRepository.find();
    }

    async stroe(data: DogsDto) {
        const entity = await this.dogsRepository.create(data);
        await this.dogsRepository.save(entity);
        return entity;
    }

    async index() {
        const entities = await this.dogsRepository.find();
        return entities;
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

}
