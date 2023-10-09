import { Observable } from 'rxjs';

export const AUTH_PACKAGE_NAME = 'auth';
export const AUTH_SERVICE_NAME = 'AuthService';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;
  login(request: LoginRequest): Observable<LoginResponse>;
  validate(request: ValidateRequest): Observable<ValidateResponse>;
}
