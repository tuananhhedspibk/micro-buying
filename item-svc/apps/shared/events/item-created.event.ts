import { BaseEvent } from 'nestjs-event-sourcing';

type CreatedItemData = Readonly<{
  code: string;
  name: string;
  image: string;
}>;

export class ItemCreatedEvent extends BaseEvent {
  public code: string;
  public image: string;
  public name: string;

  constructor(data: CreatedItemData) {
    super();

    this.code = data.code;
    this.image = data.image;
    this.name = data.name;
  }
}
