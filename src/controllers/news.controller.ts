import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { response } from 'express';

@Controller('news')
export class NewsController {

  @Get()
    getNews(
    ) {
        return {
          message: `Retornamos todos las news`,
        };

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
        return `notice ${noticeId}`;
    }

    @Delete(':id')
    delete(@Param('id') id: number){
      return{
        id
      };
    }
}
