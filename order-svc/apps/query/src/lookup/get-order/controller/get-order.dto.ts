import { IsUUID } from 'class-validator';

export class GetOrderDto {
  @IsUUID()
  public id: string;
}
