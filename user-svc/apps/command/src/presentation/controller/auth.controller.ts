import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  RegisterResponse,
} from '../../domain/proto/auth.pb';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';
import { RegisterCommand } from '../../command/register/command';
import { LoginRequestDto } from '../dto/LoginRequestDto';
import { LoginCommand } from '../../command/login/command';

@Controller()
export class AuthController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    const command: RegisterCommand = new RegisterCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(payload: LoginRequestDto): Promise<LoginResponse> {
    const command: LoginCommand = new LoginCommand(payload);

    const result = await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null, token: result.token };
  }
}
