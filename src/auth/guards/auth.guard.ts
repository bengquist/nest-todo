import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request.user = {
        id: payload.sub,
        username: payload.username,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or missing token');
    }
  }
}
