import { Injectable } from '@nestjs/common';

import { Notice } from './../entities/notice.entity';

@Injectable()
export class NewsService {

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
    return this.news;
  }

  findOne(id: number){
    return this.news.find((item) => item.id === id);
  }

  remove(id: number) {
    const index = this.news.findIndex((item) => item.id === id);
    if (index === -1) {
       return `La Noticia #${id} no existe`;
    }
    this.news.splice(index, 1);
    return true;
}

}
