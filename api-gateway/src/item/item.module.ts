import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ITEM_COMMAND_PACKAGE_NAME,
  ITEM_COMMAND_SERVICE_NAME,
} from './proto/item-command.pb';
import { ItemController } from './controller/item.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ITEM_COMMAND_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ITEM_COMMAND_PACKAGE_NAME,
          protoPath:
            'node_modules/micro-buying-protos/proto/item-command.proto',
        },
      },
    ]),
  ],
  controllers: [ItemController],
})
export class ItemModule {}
