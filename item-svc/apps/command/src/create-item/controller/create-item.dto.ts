import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  public code: string;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public image: string;
}
