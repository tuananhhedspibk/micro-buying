import { IQuery } from '@nestjs/cqrs';

export class GetOrderQuery implements IQuery {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
