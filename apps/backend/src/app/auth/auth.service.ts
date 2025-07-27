import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { IUsersRepository, USERS_REPOSITORY } from '../users/repository/users-repository.interface';
import { SignInRequestDto, SignInResponseDTO } from '@common/DTOs';

@Injectable()
export class AuthService {    
  constructor( @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository, private jwtService: JwtService ) {}
  
  async signIn( dto: SignInRequestDto): Promise<SignInResponseDTO> {
    dto.email = dto.email.toLowerCase()

    const user = await this.usersRepo.findUserByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
  
    const payload: JwtPayload = {
      username: user.username,
      email: user.email,
      role: user.role
    }
    const authResponse: SignInResponseDTO = new SignInResponseDTO();
    authResponse.access_token = await this.jwtService.signAsync(payload);
    authResponse.role = user.role;
    
    return authResponse;
  }
}
