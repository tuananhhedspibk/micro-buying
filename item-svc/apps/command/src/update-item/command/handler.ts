import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
} from '@nestjs/common';

import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { UpdateItemCommand } from './command';
import {
  ItemAggregate,
  UpdatedItemData,
} from '../../common/aggregate/item.aggregate';
import {
  GetItemResponse,
  ITEM_QUERY_SERVICE_NAME,
  ItemQueryServiceClient,
} from '../../common/proto/item-query.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@CommandHandler(UpdateItemCommand)
export class UpdateItemCommandHandler
  implements ICommandHandler<UpdateItemCommand, void>, OnModuleInit {
  private querySvc: ItemQueryServiceClient;

  @Inject(ITEM_QUERY_SERVICE_NAME)
  private client: ClientGrpc;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<ItemAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public onModuleInit() {
    this.querySvc = this.client.getService<ItemQueryServiceClient>(
      ITEM_QUERY_SERVICE_NAME,
    );
  }

  public async execute(command: UpdateItemCommand): Promise<void> {
    const res: GetItemResponse = await firstValueFrom(
      this.querySvc.getItem({ id: command.id }),
    );

    if (!res || !res.data) {
      throw new HttpException('Item not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: ItemAggregate = await this.eventSourcingHandler.getById(
      ItemAggregate,
      command.id,
    );

    this.publisher.mergeObjectContext(aggregate as any);

    const updatedItemData: UpdatedItemData = {};

    if (command.code) {
      aggregate.setCode(command.code);
      updatedItemData.code = command.code;
    }

    if (command.name) {
      aggregate.setName(command.name);
      updatedItemData.name = command.name;
    }

    if (command.image) {
      aggregate.setImage(command.image);
      updatedItemData.image = command.image;
    }

    if (Object.keys(updatedItemData).length > 0) {
      aggregate.updated(updatedItemData);

      await this.eventSourcingHandler.save(aggregate);

      aggregate.commit();
    }
  }
}
