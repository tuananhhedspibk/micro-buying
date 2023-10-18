import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject, OnModuleInit } from '@nestjs/common';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { v4 as uuidv4 } from 'uuid';

import { CreateOrderCommand } from './create-order.command';
import { OrderAggregate } from '../../common/aggregate/order.aggregate';
import {
  ITEM_QUERY_SERVICE_NAME,
  ItemQueryServiceClient,
} from '../../common/proto/item-query.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand, void>, OnModuleInit {
  @Inject(ITEM_QUERY_SERVICE_NAME)
  private readonly itemClient: ClientGrpc;

  private itemQueryServiceClient: ItemQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<OrderAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public onModuleInit() {
    this.itemQueryServiceClient =
      this.itemClient.getService<ItemQueryServiceClient>(
        ITEM_QUERY_SERVICE_NAME,
      );
  }

  async execute(command: CreateOrderCommand): Promise<void> {
    const aggregate: OrderAggregate = new OrderAggregate();

    for (let i = 0; i < command.items.length; i++) {
      const res = await firstValueFrom(
        this.itemQueryServiceClient.getItem({
          id: command.items[i].itemServiceId,
        }),
      );

      if (res.data.status === 'Bought') {
        throw new BadRequestException('Item has been bought');
      }
    }

    aggregate.setId(uuidv4());

    this.publisher.mergeObjectContext(aggregate as any);

    aggregate.created({
      id: aggregate.getId(),
      buyDate: new Date(),
      items: [...command.items.map((item) => ({ id: uuidv4(), ...item }))],
    });

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
