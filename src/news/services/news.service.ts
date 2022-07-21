import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Notice } from './../entities/notice.entity';
import { CreateNoticeDto, UpdateNoticeDto } from './../dtos/news.dtos';
//import { ConfigService } from '@nestjs/config';
//import { Client } from 'pg';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {

  constructor(@InjectRepository(Notice) private noticeRepo: Repository<Notice>, ) {}


  findAll(){
    console.log("llegamos a find");
    return this.noticeRepo.find();
  }

  findOne(id: number){
    console.log("llegamos a findOne");
    const notice = this.noticeRepo.findOne(id);
    if(!notice){
        throw new NotFoundException(`La Noticia #${id} no existe`);
    }
    return notice;
  }

  remove(id: number) {
    return this.noticeRepo.delete(id);
  }

}
