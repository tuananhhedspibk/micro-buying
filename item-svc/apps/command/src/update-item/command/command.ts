import { ICommand } from '@nestjs/cqrs';
import { UpdateItemDto } from '../controller/update-item.dto';

export class UpdateItemCommand implements ICommand {
  public id: string;
  public code?: string;
  public name?: string;
  public image?: string;

  constructor(payload: UpdateItemDto) {
    this.id = payload.id;
    this.code = payload.code;
    this.name = payload.name;
    this.image = payload.image;
  }
}
