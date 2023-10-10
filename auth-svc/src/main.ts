import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { AUTH_PACKAGE_NAME } from './auth/proto/auth.pb';
import { HttpExceptionFilter } from './auth/infrastructure/filter/http-exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: AUTH_PACKAGE_NAME,
      protoPath: 'node_modules/micro-buying-protos/proto/auth.proto',
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
