import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService , private jwtService: JwtService ) {} 

    async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
} 
}
