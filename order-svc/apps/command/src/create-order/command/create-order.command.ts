import { ICommand } from '@nestjs/cqrs';
import { CreateOrderDto, OrderItem } from '../controller/create-order.dto';

export class CreateOrderCommand implements ICommand {
  public items: OrderItem[];

  constructor(payload: CreateOrderDto) {
    this.items = payload.items;
  }
}
