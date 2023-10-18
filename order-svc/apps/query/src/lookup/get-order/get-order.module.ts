import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../../infrastructure/entity/order.entity';
import { GetOrderController } from './controller/get-order.controller';
import { GetOrderQueryHandler } from './query/get-order.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Order])],
  controllers: [GetOrderController],
  providers: [GetOrderQueryHandler],
})
export class GetOrderModule {}
