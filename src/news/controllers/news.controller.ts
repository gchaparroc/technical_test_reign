import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { response } from 'express';
import { NewsService } from './../services/news.service';


@Controller('news')
export class NewsController {

  constructor(private newsService: NewsService){}

  @Get()
    getNews(
    ) {
      return this.newsService.findAll();
    }

    @Get('paginados')
    getNewsPaginados(
      //@Query('limit') limit = 100,
      @Query('limit') limit: number,
      //@Query('offset') offset = 50,
      @Query('offset') offset: number,
      @Query('brand') brand: string,
    ) {
        return {
          message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
        };
    }

    @Get(':noticeId')
    @HttpCode(HttpStatus.ACCEPTED)
    getNotice(@Param('noticeId') noticeId: string) {
      return this.newsService.findOne(+noticeId);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
      return{
        id
      };
    }
}
