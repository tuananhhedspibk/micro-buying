import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

import {
  ConsumerGroupId as KafkaConsumerGroupId,
  ClientId as KafkaClientId,
} from '@shared/kafka/constants';

import { QueryModule } from './query.module';
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
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice<KafkaOptions>(
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: KafkaClientId.Order,
          brokers: [config.get('KAFKA_URL')],
        },
        consumer: {
          groupId: KafkaConsumerGroupId.OrderSvc,
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
