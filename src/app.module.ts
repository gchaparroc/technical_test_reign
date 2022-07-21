import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsController } from './news/controllers/news.controller';
import { NewsService } from './news/services/news.service';
import { NewsModule } from './news/news.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports:  [
                ConfigModule.forRoot({
                  envFilePath: enviroments[process.env.NODE_ENV] || '.env',
                  load: [config],
                  isGlobal: true,
                  validationSchema: Joi.object({
                    API_KEY: Joi.number().required(),
                    DATABASE_NAME: Joi.string().required(),
                    PORT: Joi.number().required(),
                  }),
                }),
                NewsModule,
                DatabaseModule,
            ],
  controllers: [AppController, NewsController],
  providers: [AppService, NewsService],
})
export class AppModule {}
