import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Notice } from './../entities/notice.entity';
import { CreateNoticeDto, UpdateNoticeDto, FilterNewsDto } from './../dtos/news.dtos';
//import { ConfigService } from '@nestjs/config';
//import { Client } from 'pg';
import { Repository, Like, FindConditions } from 'typeorm';

@Injectable()
export class NewsService {

  constructor(@InjectRepository(Notice) private noticeRepo: Repository<Notice>, ) {}


  findAll(params?: FilterNewsDto){
    if(params.limit != undefined && params.offset != undefined){
      const { limit, offset } = params;
      const { autor, titulo } = params;
      return this.noticeRepo.find({
        take: limit,
        skip: offset,
      });
    }
    return this.noticeRepo.find();
  }

  findAllFiltrada(params?: FilterNewsDto){
    const where: FindConditions<Notice> = {};
    if(params.autor != undefined){
      const { autor } = params;
      where.author = Like(`%${autor}%`);
    }else if(params.titulo != undefined){
      const { titulo } = params;
      where.title = Like(`%${titulo}%`);
    }else if(params.tag != undefined){
      const { tag } = params;
      where._tags = Like(`%${tag}%`);
    }
    return this.noticeRepo.find({
      where,
    });
  }

  async findOne(id: number){
    const notice = await this.noticeRepo.findOne(id);
    if(!notice){
        throw new NotFoundException(`La Noticia #${id} no existe`);
    }
    return notice;
  }

  async remove(id: number) {
    const notice = await this.noticeRepo.findOne(id);
    if(!notice){
      throw new NotFoundException(`La Noticia #${id} no existe`);
    }
    return this.noticeRepo.delete(id);
  }

}
