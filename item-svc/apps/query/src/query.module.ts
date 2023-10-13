import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import rdb from './infrastructure/config/rdb';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [rdb] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('rdb'),
    }),
    CqrsModule,
    ConsumerModule,
  ],
})
export class QueryModule {}
