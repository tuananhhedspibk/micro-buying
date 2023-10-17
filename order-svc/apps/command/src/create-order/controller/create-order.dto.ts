import { ArrayMinSize, IsNotEmpty } from 'class-validator';

export class OrderItem {
  @IsNotEmpty()
  itemServiceId: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;
}

export class CreateOrderDto {
  @ArrayMinSize(1)
  items: OrderItem[];
}
