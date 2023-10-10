import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config as dotenvConfig } from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { User } from './auth/infrastructure/entity/user.entity';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.QUERY_DATABASE_HOST}`,
      port: parseInt(process.env.QUERY_DATABASE_PORT),
      username: `${process.env.QUERY_DATABASE_USERNAME}`,
      password: `${process.env.QUERY_DATABASE_PASSWORD}`,
      database: `${process.env.QUERY_DATABASE_NAME}`,
      entities: [User],
    }),
    AuthModule,
  ],
})
export class AppModule {}
