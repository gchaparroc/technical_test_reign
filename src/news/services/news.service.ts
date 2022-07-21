import { Injectable, NotFoundException } from '@nestjs/common';

import { Notice } from './../entities/notice.entity';
import { CreateNoticeDto, UpdateNoticeDto } from './../dtos/news.dtos';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class NewsService {

  constructor(
    private configService: ConfigService,
) {}

  private counterId = 1;

  private news: Notice[] = [
    {
        id: 1,
        title: 'Noticia 1',
        author: 'Angel David Chaparro Vasquez',
        comment_text: 'Comentario cobre la noticia 1',
    },
  ];

  findAll(){
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.news;
  }

  findOne(id: number){
    const notice = this.news.find((item) => item.id === id);
    if(!notice){
        throw new NotFoundException(`La Noticia #${id} no existe`);
    }
    return notice;
  }

  remove(id: number) {
    const index = this.news.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`La Noticia #${id} no existe`);
    }
    this.news.splice(index, 1);
    return true;
  }

}
