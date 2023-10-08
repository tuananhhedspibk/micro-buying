import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import rdb from './infrastructure/config/rdb';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [rdb] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('rdb'),
    }),
  ],
})
export class AppModule {}
