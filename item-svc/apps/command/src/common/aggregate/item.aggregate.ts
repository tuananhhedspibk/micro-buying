import { ItemCreatedEvent } from '@shared/events/item-created.event';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export type CreatedItemData = Readonly<{
  code: string;
  name: string;
  image: string;
}>;

export class ItemAggregate extends ExtendedAggregateRoot {
  private code: string;
  private image: string;
  private name: string;

  public getId(): string | undefined {
    return this.id;
  }

  public setId(value: string) {
    this.id = value;
  }

  public getCode(): string {
    return this.code;
  }

  public setCode(value: string) {
    this.code = value;
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(value: string) {
    this.image = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public created(data: CreatedItemData) {
    const event: ItemCreatedEvent = new ItemCreatedEvent(data);

    this.apply(event);
  }
}
