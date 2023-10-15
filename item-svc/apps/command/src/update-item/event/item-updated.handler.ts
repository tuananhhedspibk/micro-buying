import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ItemUpdatedEvent } from '@shared/events/item-updated.event';

import { ItemEventProducer } from '../../common/producer/item-event.producer';

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedHandler implements IEventHandler<ItemUpdatedEvent> {
  @Inject(ItemEventProducer)
  private readonly eventProducer: ItemEventProducer;

  public async handle(event: ItemUpdatedEvent) {
    const { constructor }: ItemUpdatedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
