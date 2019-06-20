import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dogs } from './dogs.entity';

@Injectable()
export class DogsService {
    constructor(
        @InjectRepository(Dogs)
        private readonly dogsRepository: Repository<Dogs>,
    ){}

    findAll(): Promise<Dogs[]> {
        return this.dogsRepository.find();
    }
}
