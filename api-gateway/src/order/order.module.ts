import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  ORDER_COMMAND_PACKAGE_NAME,
  ORDER_COMMAND_SERVICE_NAME,
} from './proto/order-command.pb';
import {
  ORDER_QUERY_PACKAGE_NAME,
  ORDER_QUERY_SERVICE_NAME,
} from './proto/order-query.pb';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ORDER_COMMAND_PACKAGE_NAME,
          protoPath:
            'node_modules/micro-buying-protos/proto/order-command.proto',
        },
      },
      {
        name: ORDER_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50063',
          package: ORDER_QUERY_PACKAGE_NAME,
          protoPath: 'node_modules/micro-buying-protos/proto/order-query.proto',
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
