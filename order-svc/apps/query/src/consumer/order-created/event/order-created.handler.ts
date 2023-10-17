import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderCreatedEvent } from '@shared/events/order-created.event';

import { Order } from '../../../infrastructure/entity/order.entity';
import { Repository } from 'typeorm';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  @InjectRepository(Order)
  private readonly repository: Repository<Order>;

  public handle(event: OrderCreatedEvent): Promise<Order> {
    const order: Order = new Order();

    order.id = event.id;
    order.buyDate = event.buyDate;

    order.items = [
      ...event.items.map(
        (item) =>
          ({
            id: item.id,
            itemServiceId: item.itemServiceId,
            orderId: order.id,
            name: item.name,
            code: item.code,
            image: item.image,
          }) as any,
      ),
    ];

    return this.repository.save(order);
  }
}
