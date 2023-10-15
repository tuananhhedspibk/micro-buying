import { IQuery } from '@nestjs/cqrs';

export class GetItemQuery implements IQuery {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
