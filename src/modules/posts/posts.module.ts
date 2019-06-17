import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DemoService } from '../posts/providers/demo/demo.service';

@Module({
    controllers: [PostsController],
    providers: [DemoService]
})
export class PostsModule {}
