import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { Notice } from './entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [ NewsController ],
  providers: [ NewsService ],
  exports: [ NewsService, TypeOrmModule ],
})
export class NewsModule {}
