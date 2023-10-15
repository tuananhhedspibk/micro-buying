import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from '../../infrastructure/entity/item.entity';
import { GetItemController } from './controller/get-item.controller';
import { GetItemQueryHandler } from './query/get-item.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Item])],
  controllers: [GetItemController],
  providers: [GetItemQueryHandler],
})
export class GetItemModule {}
