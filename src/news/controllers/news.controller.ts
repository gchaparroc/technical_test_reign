import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpStatus, HttpCode/*, ParseIntPipe*/ } from '@nestjs/common';
import { response } from 'express';
import { NewsService } from './../services/news.service';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateNoticeDto, FilterNewsDto } from './../dtos/news.dtos';
import { ApiTags, ApiOperation  } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {

  constructor(private newsService: NewsService){}

  @Get()
  @ApiOperation({summary: 'Listar todas las noticias y paginacion (Ejemplo: localhost:3000/news?limit=5&offset=0)'})
    getNews(@Query() params: FilterNewsDto) {
      return this.newsService.findAll(params);
    }

    @Get('filtros')
    @ApiOperation({summary: 'Filtrar noticias por autor o titulo (Ejemplo: localhost:3000/news/filtros?autor=%nombreAutor% ó localhost:3000/news/filtros?titulo=%titulo%)'})
    getNewsFiltradas(@Query() params: FilterNewsDto) {
      return this.newsService.findAllFiltrada(params);
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
