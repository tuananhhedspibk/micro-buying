import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemRepository } from '../../infrastructure/repository/item.repository';
import { ItemCreatedConsumer } from './consumer/item-created.consumer';
import { ItemCreatedHandler } from './event/item-created.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      { name: 'KAFKA_SERVICE', transport: Transport.KAFKA },
    ]),
    TypeOrmModule.forFeature([ItemRepository]),
  ],
  controllers: [ItemCreatedConsumer],
  providers: [ItemCreatedHandler],
})
export class ItemCreatedModule {}
