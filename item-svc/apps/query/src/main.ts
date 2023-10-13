import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(QueryModule);
  const config: ConfigService = app.get(ConfigService);

  await configure(app, config);

  await app.listen(undefined);
}

async function configure(
  app: INestApplication,
  config: ConfigService,
): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.startAllMicroservices();
}

bootstrap();
