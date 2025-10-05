import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('dev-token')
  devToken(@Body('username') username?: string) {
    return this.authService.signDevToken(username);
  }
}

