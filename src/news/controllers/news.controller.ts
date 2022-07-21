import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode/*, ParseIntPipe*/ } from '@nestjs/common';
import { response } from 'express';
import { NewsService } from './../services/news.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateNoticeDto } from './../dtos/news.dtos';

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
    getNotice(@Param('noticeId', ParseIntPipe) noticeId: number) {
      return this.newsService.findOne(noticeId);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
      return this.newsService.remove(id);
    }
}
