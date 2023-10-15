import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Item } from '../../infrastructure/entity/item.entity';
import { KAFKA_SERVICE } from '../../utils/constants';
import { ItemUpdatedConsumer } from './consumer/item-updated.consumer';
import { ItemUpdatedHandler } from './event/item-updated.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
      },
    ]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [ItemUpdatedConsumer],
  providers: [ItemUpdatedHandler],
})
export class ItemUpdatedModule {}
