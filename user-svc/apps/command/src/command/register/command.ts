import { ICommand } from '@nestjs/cqrs';

import { RegisterRequestDto } from '../../presentation/dto/RegisterRequestDto';

export class RegisterCommand implements ICommand {
  public email: string;
  public password: string;

  constructor(payload: RegisterRequestDto) {
    this.email = payload.email;
    this.password = payload.password;
  }
}
