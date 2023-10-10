import { IsEmail, IsString, MinLength } from 'class-validator';

import { RegisterRequest } from '../../proto/auth.pb';

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}
