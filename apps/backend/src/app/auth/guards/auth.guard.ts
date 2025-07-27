import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../jwt.constants';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtService = new JwtService({ secret: jwtConstants.secret });

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
