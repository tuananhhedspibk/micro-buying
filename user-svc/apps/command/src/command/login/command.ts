import { ICommand } from '@nestjs/cqrs';

import { LoginRequestDto } from '../../presentation/dto/LoginRequestDto';

export class LoginCommand implements ICommand {
  public email: string;
  public password: string;

  constructor(payload: LoginRequestDto) {
    this.email = payload.email;
    this.password = payload.password;
  }
}
