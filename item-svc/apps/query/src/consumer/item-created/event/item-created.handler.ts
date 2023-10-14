import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../../infrastructure/entity/item.entity';
import { ItemCreatedEvent } from '@shared/events/item-created.event';
import { Repository } from 'typeorm';

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedHandler implements IEventHandler<ItemCreatedEvent> {
  @InjectRepository(Item)
  private readonly repository: Repository<Item>;

  public handle(event: ItemCreatedEvent): Promise<Item> {
    const item: Item = new Item();

    item.id = event.id;
    item.code = event.code;
    item.image = event.image;
    item.name = event.name;

    return this.repository.save(item);
  }
}
