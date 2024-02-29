import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  login(@Body() createAuthDto: AuthPayloadDto) {
    return this.authService.validateUser(createAuthDto);
  }
}
