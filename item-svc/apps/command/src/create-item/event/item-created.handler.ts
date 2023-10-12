import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ItemEventProducer } from '@command/common/producer/item-event.producer';

import { ItemCreatedEvent } from '@shared/events/item-created.event';

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedHandler implements IEventHandler<ItemCreatedEvent> {
  @Inject(ItemEventProducer)
  private readonly eventProducer: ItemEventProducer;

  public async handle(event: ItemCreatedEvent) {
    const { constructor }: ItemCreatedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
