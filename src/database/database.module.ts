import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD123456';
/*
const client = new Client({
  user: 'nico',
  host: 'localhost',
  database: 'my_store',
  password: 'admin123',
  port: 5432,
});

client.connect();
*/
@Global()
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
          const { user, host, dbName, password, port } = configService.postgres;
          return {
            type: 'postgres',
            host,
            port,
            username: user,
            password,
            database: dbName,
            synchronize: true, // new attr
            autoLoadEntities: true, // new attr
          };
        },
      }),
    ],
    providers: [
    {
        provide: 'API_KEY',
        useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, port, password } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY]
    },
    ],
    exports: ['API_KEY', 'PG', TypeOrmModule],
})
		export class DatabaseModule {}
