import { BaseEvent } from 'nestjs-event-sourcing';

type UpdatedItemData = Readonly<{
  id: string;
  code?: string;
  name?: string;
  image?: string;
}>;

export class ItemUpdatedEvent extends BaseEvent {
  public code?: string;
  public image?: string;
  public name?: string;

  constructor(data: UpdatedItemData) {
    super(data.id);

    this.code = data.code;
    this.image = data.image;
    this.name = data.name;
  }
}
