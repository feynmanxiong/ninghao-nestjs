import { Controller, Get, Req, Query, Param, Body, Headers, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    @Get()
    index(@Headers('authorization') headers) {
       console.log(headers)
        return [
            {
                title: "hello ~"
            }
        ]       
    }

    @Get(':id')
    show(@Param() params) {
        return {
            title: `Post ${params.id}`
        }
    }

    @Post()
    Store(@Body() post: CreatePostDto) {
        console.log(post.title)
    }
    
}
