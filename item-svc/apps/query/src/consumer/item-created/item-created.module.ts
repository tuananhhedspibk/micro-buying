import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from '../../infrastructure/entity/item.entity';

import { ItemCreatedConsumer } from './consumer/item-created.consumer';
import { ItemCreatedHandler } from './event/item-created.handler';
import { KAFKA_SERVICE } from '../../utils/constants';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      { name: KAFKA_SERVICE, transport: Transport.KAFKA },
    ]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [ItemCreatedConsumer],
  providers: [ItemCreatedHandler],
})
export class ItemCreatedModule {}
