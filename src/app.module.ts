import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/controllers/news.controller';
import { NewsService } from './news/services/news.service';
import { NewsModule } from './news/news.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:  [  NewsModule,
                DatabaseModule,
                ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
              }),
            ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
