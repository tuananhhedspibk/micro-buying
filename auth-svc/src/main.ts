import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from './proto/auth.pb';
import { join } from 'path';
import { HttpExceptionFilter } from './infrastructure/filter/http-exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    trasport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: AUTH_PACKAGE_NAME,
      protoPath: join('node_modules/micro-buy-shared-proto/proto/auth.proto'),
    },
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
