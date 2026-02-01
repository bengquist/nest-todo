import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.authenticate(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getUserProfile(
    @Request() request: { user: { id: string; username: string } },
  ) {
    return request.user;
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body);
  }
}
