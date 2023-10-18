import { ICommand } from '@nestjs/cqrs';
import { CreateItemDto } from '../controller/create-item.dto';

export class CreateItemCommand implements ICommand {
  public code: string;
  public name: string;
  public image: string;

  constructor(payload: CreateItemDto) {
    this.code = payload.code;
    this.name = payload.name;
    this.image = payload.image;
  }
}
