import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import {
  ConsumerGroupId as KafkaConsumerGroupId,
  ClientId as KafkaClientId,
} from '@shared/kafka/constants';
import { ITEM_QUERY_PACKAGE_NAME } from './common/proto/item-query.pb';

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
          clientId: KafkaClientId.Item,
          brokers: [config.get('KAFKA_URL')],
        },
        consumer: {
          groupId: KafkaConsumerGroupId.ItemSvc,
        },
      },
    },
    { inheritAppConfig: true },
  );

  app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('QUERY_GRPC_URL'),
        package: ITEM_QUERY_PACKAGE_NAME,
        protoPath: 'node_modules/micro-buying-protos/proto/item-query.proto',
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
