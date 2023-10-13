import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ITEM_COMMAND_PACKAGE_NAME } from './common/proto/item-command.pb';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(CommandModule);
  const config: ConfigService = app.get(ConfigService);

  await configure(app, config);
}

async function configure(
  app: INestApplication,
  config: ConfigService,
): Promise<void> {
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.connectMicroservice<GrpcOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: config.get('COMMAND_GRPC_URL'),
        package: ITEM_COMMAND_PACKAGE_NAME,
        protoPath: 'node_modules/micro-buying-protos/proto/item-command.proto',
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}

bootstrap();
