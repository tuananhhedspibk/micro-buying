import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { ConsumerModule } from './consumer/consumer.module';
import { config as rdbConfig } from './infrastructure/config/rdb';
import { GetOrderModule } from './lookup/get-order/get-order.module';

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
    GetOrderModule,
  ],
})
export class QueryModule {}
