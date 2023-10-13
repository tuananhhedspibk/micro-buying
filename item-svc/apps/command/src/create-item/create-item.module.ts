import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { CreateItemController } from './controller/create-item.controller';
import { CreateItemCommandHandler } from './command/handler';
import { ItemCreatedHandler } from './event/item-created.handler';

import { ItemEventProducer } from '../common/producer/item-event.producer';

@Module({
  imports: [CqrsModule],
  controllers: [CreateItemController],
  providers: [
    CreateItemCommandHandler,
    ItemCreatedHandler,
    ItemEventProducer,
    EventSourcingHandler,
  ],
})
export class CreateItemModule {}
