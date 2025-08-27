import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { RequestWithUser } from '../interfaces/request-with-user.interface';
import { jwtConstants } from '../jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtService = new JwtService({ secret: jwtConstants.secret });

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const token = request.cookies?.access_token;

        if (!token) {
            throw new UnauthorizedException('Missing access token cookie');
        }

        try {
            const payload = this.jwtService.verify<JwtPayload>(token);
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }
}
