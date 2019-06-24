import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsDto } from './dogs.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('posts')
export class DogsController {
    constructor(
        private readonly dogsService: DogsService
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    async store(@Body() data: DogsDto, @User() user: UserEntity) {
        return await this.dogsService.stroe(data, user);
    }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async index() {
        return await this.dogsService.index();
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

    @Post(':id/vote')
    @UseGuards(AuthGuard())
    async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity){
        return await this.dogsService.vote(id, user);
    }

    @Delete(':id/vote')
    @UseGuards(AuthGuard())
    async unVote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity){  
            return await this.dogsService.unVote(id, user);
    }

    @Get(':id/liked')
    @UseInterceptors(ClassSerializerInterceptor)
    async liked(@Param('id', ParseIntPipe) id: number){
        return await this.dogsService.liked(id);
    }
    

}
