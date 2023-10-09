import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from '../infrastructure/entity/user.entity';

@Injectable()
export class JwtService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  private readonly jwt: Jwt;

  constructor(jwt: Jwt) {
    this.jwt = jwt;
  }

  public async decode(token: string): Promise<string | { [key: string]: any }> {
    return this.jwt.decode(token);
  }

  public async findUser(decoded: any): Promise<User> {
    return this.repository.findOne({ where: { id: decoded.id } });
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<any> {
    return this.jwt.verify(token);
  }
}
