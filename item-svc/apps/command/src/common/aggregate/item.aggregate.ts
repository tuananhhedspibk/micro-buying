import { ItemCreatedEvent } from '@shared/events/item-created.event';
import { ItemUpdatedEvent } from '@shared/events/item-updated.event';
import { ExtendedAggregateRoot } from 'nestjs-event-sourcing';

export type CreatedItemData = Readonly<{
  code: string;
  name: string;
  image: string;
}>;

export type UpdatedItemData = {
  code?: string;
  name?: string;
  image?: string;
  status?: string;
};

export class ItemAggregate extends ExtendedAggregateRoot {
  private code: string;
  private image: string;
  private name: string;
  private status: string;

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

  public getStatus(): string {
    return this.status;
  }

  public setStatus(value: string) {
    this.status = value;
  }

  public created(data: CreatedItemData) {
    const event: ItemCreatedEvent = new ItemCreatedEvent({
      id: this.id,
      ...data,
    });

    this.apply(event);
  }

  public onItemCreatedEvent(event: ItemCreatedEvent): void {
    this.id = event.id;
    this.setCode(event.code);
    this.setName(event.name);
    this.setImage(event.image);
  }

  public updated(data: UpdatedItemData) {
    const event: ItemUpdatedEvent = new ItemUpdatedEvent({
      id: this.id,
      ...data,
    });

    this.apply(event);
  }

  public onItemUpdatedEvent(event: ItemUpdatedEvent): void {
    this.id = event.id;

    if (event.code) {
      this.setCode(event.code);
    }

    if (event.name) {
      this.setName(event.name);
    }

    if (event.image) {
      this.setImage(event.image);
    }

    if (event.status) {
      this.setStatus(event.status);
    }
  }
}
