import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { async } from 'rxjs/internal/scheduler/async';
import { DogsDto } from './dogs.dto';

@Controller('posts')
export class DogsController {
    constructor(
        private readonly dogsService: DogsService
    ) {}

    @Post()
    async store(@Body() data: DogsDto) {
        return await this.dogsService.stroe(data);
    }

    @Get()
    async findAll() {
        return await this.dogsService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return await this.dogsService.show(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<DogsDto>) {
        return await this.dogsService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.dogsService.destroy(id);
    }
}
