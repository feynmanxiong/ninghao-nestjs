import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dogs } from './dogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dogs])],
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule {}
