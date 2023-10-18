import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { CreateOrderController } from './controller/create-order.controller';

import { CreateOrderCommandHandler } from './command/create-order.handler';
import {
  ITEM_COMMAND_PACKAGE_NAME,
  ITEM_COMMAND_SERVICE_NAME,
} from '../common/proto/item-command.pb';
import { OrderEventProducer } from '../common/producer/order-event.producer';
import {
  ITEM_QUERY_PACKAGE_NAME,
  ITEM_QUERY_SERVICE_NAME,
} from '../common/proto/item-query.pb';

import { OrderCreatedHandler } from './event/order-created.handler';
import { CreateOrderSaga } from './sagas/create-order.saga';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: ITEM_COMMAND_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('ITEM_COMMAND_GRPC_URL'),
            package: ITEM_COMMAND_PACKAGE_NAME,
            protoPath:
              'node_modules/micro-buying-protos/proto/item-command.proto',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: ITEM_QUERY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('ITEM_QUERY_GRPC_URL'),
            package: ITEM_QUERY_PACKAGE_NAME,
            protoPath:
              'node_modules/micro-buying-protos/proto/item-query.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CreateOrderController],
  providers: [
    CreateOrderCommandHandler,
    OrderEventProducer,
    OrderCreatedHandler,
    EventSourcingHandler,
    CreateOrderSaga,
  ],
})
export class CreateOrderModule {}
