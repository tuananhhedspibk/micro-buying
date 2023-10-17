import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { OrderCreatedEvent } from '@shared/events/order-created.event';

import { OrderEventProducer } from '../../common/producer/order-event.producer';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  @Inject(OrderEventProducer)
  private readonly eventProducer: OrderEventProducer;

  public async handle(event: OrderCreatedEvent) {
    const { constructor }: OrderCreatedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
