import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KAFKA_SERVICE } from '../../utils/constants';

import { Order } from '../../infrastructure/entity/order.entity';
import { OrderCreatedConsumer } from './consumer/order-created.consumer';
import { OrderCreatedHandler } from './event/order-created.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      { name: KAFKA_SERVICE, transport: Transport.KAFKA },
    ]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderCreatedConsumer],
  providers: [OrderCreatedHandler],
})
export class OrderCreatedModule {}
