import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from 'common/src/lib/DTOs/sign-In-response.dto';

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
    const authResponse: SignInResponse = new SignInResponse();
    authResponse.access_token = await this.jwtService.signAsync(payload);
    authResponse.role = user.role;
    return authResponse;
  } 
}
