import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
  AUTH_SERVICE_NAME,
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '../../proto/auth.pb';
import { RegisterRequestDto } from '../dto/RegisterRequestDto';
import { LoginRequestDto } from '../dto/LoginRequestDto';
import { ValidateRequestDto } from '../dto/ValidateRequestDto';
import { AuthService } from '../../service/auth.service';

@Controller()
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  private async register(
    payload: RegisterRequestDto,
  ): Promise<RegisterResponse> {
    return this.authService.register(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  private async login(payload: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(payload);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
  private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
    return this.authService.validate(payload);
  }
}
