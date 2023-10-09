import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ValidateRequestDto } from '../presentation/dto/ValidateRequestDto';
import {
  LoginResponse,
  RegisterResponse,
  ValidateResponse,
} from '../proto/auth.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infrastructure/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from './jwt.service';
import { RegisterRequestDto } from '../presentation/dto/RegisterRequestDto';
import { LoginRequestDto } from '../presentation/dto/LoginRequestDto';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async register({
    email,
    password,
  }: RegisterRequestDto): Promise<RegisterResponse> {
    let user: User = await this.repository.findOne({ where: { email } });

    if (user) {
      return { status: HttpStatus.CONFLICT, error: ['Email already exists'] };
    }

    user = new User();

    user.email = email;
    user.password = this.jwtService.encodePassword(password);

    await this.repository.save(user);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({
    email,
    password,
  }: LoginRequestDto): Promise<LoginResponse> {
    const user: User = await this.repository.findOne({ where: { email } });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Email not found'],
        token: null,
      };
    }

    const isPasswordValid = this.jwtService.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Password wrong'],
        token: null,
      };
    }

    const token = this.jwtService.generateToken(user);

    return { status: HttpStatus.OK, token, error: null };
  }

  public async validate({
    token,
  }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: User = await this.jwtService.verify(token);

    if (!decoded) {
      return {
        status: HttpStatus.FORBIDDEN,
        error: ['Token is invalid'],
        userId: null,
      };
    }

    const user: User = await this.jwtService.findUser(decoded);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['User not found'],
        userId: null,
      };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}
