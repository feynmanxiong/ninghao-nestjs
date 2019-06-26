import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dogs } from './dogs.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dogs, Tag]),
    AuthModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }   
    )
  ],
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule {}
