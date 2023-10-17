import { IsUUID } from 'class-validator';

export class GetItemDto {
  @IsUUID()
  public id: string;
}
