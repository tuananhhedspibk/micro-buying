import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config as rdbConfig } from './infrastructure/config/rdb';

import { CqrsModule } from '@nestjs/cqrs';
import { ConsumerModule } from './consumer/consumer.module';
import { ConfigModule } from '@nestjs/config';
import { GetItemModule } from './lookup/get-item/get-item.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: rdbConfig.host,
      port: parseInt(rdbConfig.port),
      database: rdbConfig.database,
      username: rdbConfig.username,
      password: rdbConfig.password,
      entities: rdbConfig.entities,
      namingStrategy: rdbConfig.namingStrategy,
    }),
    CqrsModule,
    ConsumerModule,
    GetItemModule,
  ],
})
export class QueryModule {}
