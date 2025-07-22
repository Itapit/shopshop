import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDTO } from 'common/src/lib/DTOs/sign-In-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(private readonly userService: UserService , private jwtService: JwtService ) {} 

    async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByEmail(email);
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.username };
    const authResponse: SignInResponseDTO = new SignInResponseDTO();
    authResponse.access_token = await this.jwtService.signAsync(payload);
    authResponse.role = user.role;
    return authResponse;
  } 
}
