import { BaseEvent } from 'nestjs-event-sourcing';

import {
  CreatedOrderData,
  OrderItem,
} from '@command/common/aggregate/order.aggregate';

export class OrderCreatedEvent extends BaseEvent {
  public buyDate: Date;
  public items: OrderItem[];

  constructor(data: CreatedOrderData) {
    super(data.id);

    this.buyDate = data.buyDate;
    this.items = [...data.items];
  }
}
