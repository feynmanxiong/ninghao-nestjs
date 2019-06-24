import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dogs } from './dogs.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dogs]),
    // AuthModule
    PassportModule.register({
      defaultStrategy: 'jwt'
    }   
    )
  ],
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule {}
