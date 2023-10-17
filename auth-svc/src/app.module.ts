import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config as dotenvConfig } from 'dotenv';

import { config as rdbConfig } from './auth/infrastructure/config/rdb';

import { AuthModule } from './auth/auth.module';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: rdbConfig.host,
      port: parseInt(rdbConfig.port),
      username: rdbConfig.username,
      password: rdbConfig.password,
      database: rdbConfig.database,
      entities: rdbConfig.entities,
      namingStrategy: rdbConfig.namingStrategy,
    }),
    AuthModule,
  ],
})
export class AppModule {}
