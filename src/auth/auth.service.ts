import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { LoginDto, RegisterDto, SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ username, password }: LoginDto) {
    const user = await this.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signIn(user);
  }

  async validateUser({ username, password }: LoginDto) {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async registerUser({ username, password }: RegisterDto) {
    // Implement user registration logic here
    return null;
  }

  async signIn({ id, username }: SignInDto) {
    const tokenPayload = { sub: id, username };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { id, username, accessToken };
  }
}
