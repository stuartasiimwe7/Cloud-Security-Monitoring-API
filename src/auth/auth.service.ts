import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signDevToken(username = 'dev', roles: string[] = ['admin']) {
    const payload = { username, roles, sub: username };
    return { access_token: this.jwtService.sign(payload) };
  }
}

