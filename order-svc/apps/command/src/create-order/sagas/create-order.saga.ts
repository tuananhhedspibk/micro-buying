import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import {
  ITEM_COMMAND_SERVICE_NAME,
  ItemCommandServiceClient,
  UpdateItemRequest,
} from '../../common/proto/item-command.pb';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, delay, firstValueFrom, map } from 'rxjs';
import { OrderCreatedEvent } from '@shared/events/order-created.event';

@Injectable()
export class CreateOrderSaga implements OnModuleInit {
  @Inject(ITEM_COMMAND_SERVICE_NAME)
  private readonly itemClient: ClientGrpc;

  private itemCommandServiceClient: ItemCommandServiceClient;

  public onModuleInit() {
    this.itemCommandServiceClient =
      this.itemClient.getService<ItemCommandServiceClient>(
        ITEM_COMMAND_SERVICE_NAME,
      );
  }

  @Saga()
  private onEvent(
    events$: Observable<OrderCreatedEvent>,
  ): Observable<ICommand> {
    const apply = map((event: OrderCreatedEvent) => {
      this.onOrderCreatedEvent(event);
      return null;
    });

    return <Observable<ICommand>>(
      events$.pipe(ofType(OrderCreatedEvent), delay(1000), apply)
    );
  }

  private async onOrderCreatedEvent(event: OrderCreatedEvent): Promise<void> {
    const requests: UpdateItemRequest[] = event.items.map((item) => ({
      id: item.itemServiceId,
      status: 'Bought',
    }));

    const reqPromises = requests.map((req) =>
      firstValueFrom(this.itemCommandServiceClient.updateItem(req)),
    );

    const responses = await Promise.all(reqPromises);

    console.log({ requests, responses });
  }
}
