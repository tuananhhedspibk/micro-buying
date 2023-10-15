import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import {
  ITEM_QUERY_PACKAGE_NAME,
  ITEM_QUERY_SERVICE_NAME,
} from '../common/proto/item-query.pb';
import { ItemEventProducer } from '../common/producer/item-event.producer';

import { UpdateItemController } from './controller/update-item.controller';
import { UpdateItemCommandHandler } from './command/handler';

import { ItemUpdatedHandler } from './event/item-updated.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: ITEM_QUERY_SERVICE_NAME,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get('QUERY_GRPC_URL'),
            package: ITEM_QUERY_PACKAGE_NAME,
            protoPath:
              'node_modules/micro-buying-protos/proto/item-query.proto',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UpdateItemController],
  providers: [
    UpdateItemCommandHandler,
    ItemUpdatedHandler,
    ItemEventProducer,
    EventSourcingHandler,
  ],
})
export class UpdateItemModule {}
