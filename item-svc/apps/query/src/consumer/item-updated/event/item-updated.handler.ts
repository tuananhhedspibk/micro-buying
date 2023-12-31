import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item, ItemStatus } from '../../../infrastructure/entity/item.entity';

import { ItemUpdatedEvent } from '@shared/events/item-updated.event';
import { NotFoundException } from '@nestjs/common';

@EventsHandler(ItemUpdatedEvent)
export class ItemUpdatedHandler implements IEventHandler<ItemUpdatedEvent> {
  @InjectRepository(Item)
  private readonly repository: Repository<Item>;

  public async handle(event: ItemUpdatedEvent): Promise<void> {
    const item: Item = await this.repository.findOne({
      where: { id: event.id },
    });

    if (!item) {
      throw new NotFoundException('Not found item');
    }

    if (event.code) {
      item.code = event.code;
    }

    if (event.image) {
      item.image = event.image;
    }

    if (event.name) {
      item.name = event.name;
    }

    if (event.status) {
      item.status = event.status as ItemStatus;
    }

    await this.repository.update({ id: item.id }, item);
  }
}
