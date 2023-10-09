import { IsString } from 'class-validator';

import { ValidateRequest } from '../../domain/proto/auth.pb';

export class ValidateRequestDto implements ValidateRequest {
  @IsString()
  public readonly token: string;
}
