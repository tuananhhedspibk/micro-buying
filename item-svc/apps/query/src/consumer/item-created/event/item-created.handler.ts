import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '@query/infrastructure/entity/item.entity';
import { ItemRepository } from '@query/infrastructure/repository/item.repository';
import { ItemCreatedEvent } from '@shared/events/item-created.event';

@EventsHandler(ItemCreatedEvent)
export class ItemCreatedHandler implements IEventHandler<ItemCreatedEvent> {
  @InjectRepository(ItemRepository)
  private readonly repository: ItemRepository;

  public handle(event: ItemCreatedEvent): Promise<Item> {
    const item: Item = new Item();

    item.id = event.id;
    item.code = event.code;
    item.image = event.image;
    item.name = event.name;

    return this.repository.save(item);
  }
}
