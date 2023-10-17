import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

import { OrderCreatedEvent } from '@shared/events/order-created.event';

export type CreatedOrderData = Readonly<{
  id: string;
  buyDate: Date;
  items: OrderItem[];
}>;

export class OrderItem {
  id: string;
  itemServiceId: string;
  name: string;
  code: string;
  image: string;
}

export class OrderAggregate extends ExtendedAggregateRoot {
  private buyDate: Date;
  private items: OrderItem[];

  getId(): string | undefined {
    return this.id;
  }

  setId(value: string) {
    this.id = value;
  }

  getBuyDate(): Date {
    return this.buyDate;
  }

  setBuyDate(value: Date) {
    this.buyDate = value;
  }

  getItems(): OrderItem[] {
    return this.items;
  }

  setItems(value: OrderItem[]) {
    this.items = [...value];
  }

  created(data: CreatedOrderData) {
    const event: OrderCreatedEvent = new OrderCreatedEvent({
      id: this.id,
      ...data,
    });

    this.apply(event);
  }

  public onOrderCreatedEvent(event: OrderCreatedEvent): void {
    this.id = event.id;
    this.setBuyDate(event.buyDate);
    this.setItems(event.items);
  }
}
