import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDTO } from 'common/src/lib/DTOs/sign-In-response.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'common/src/lib/DTOs/sign-In.dto';

@Injectable()
export class AuthService {    
  constructor(private readonly userService: UserService , private jwtService: JwtService ) {} 
  
  async signIn( dto: SignInDto): Promise<{ access_token: string }> {
    dto.email = dto.email.toLowerCase()
    const user = await this.userService.findUserByEmail(dto.email);

    const match = await bcrypt.compare(dto.password, user.password);
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
