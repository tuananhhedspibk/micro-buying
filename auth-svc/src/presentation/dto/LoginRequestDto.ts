import { IsEmail, IsString } from 'class-validator';

import { LoginRequest } from '../../proto/auth.pb';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
