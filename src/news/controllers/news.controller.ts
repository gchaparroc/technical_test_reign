import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode/*, ParseIntPipe*/ } from '@nestjs/common';
import { response } from 'express';
import { NewsService } from './../services/news.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateNoticeDto } from './../dtos/news.dtos';
import { ApiTags, ApiOperation  } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {

  constructor(private newsService: NewsService){}

  @Get()
  @ApiOperation({summary: 'Listar todas las noticias'})
    getNews(
    ) {
      return this.newsService.findAll();
    }

  @Get('tasks')
    getTasks() {
    return this.newsService.getTasks();
  }

    @Get('paginados')
    @ApiOperation({summary: 'Noticias paginadas'})
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
    @ApiOperation({summary: 'Listar noticia por Id'})
    @HttpCode(HttpStatus.ACCEPTED)
    getNotice(@Param('noticeId', ParseIntPipe) noticeId: number) {
      return this.newsService.findOne(noticeId);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Eliminar noticia por Id'})
    delete(@Param('id', ParseIntPipe) id: number){
      return this.newsService.remove(id);
    }
}
