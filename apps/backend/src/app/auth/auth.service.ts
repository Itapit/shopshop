import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import {
    IUsersRepository,
    USERS_REPOSITORY,
} from '../users/repository/users-repository.interface';
import { SignInResponseDTO } from '../users/DTOs/response/sign-In-response.dto';
import { SignInRequestDto } from '../users/DTOs/request/sign-In-request.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInRequestDto): Promise<SignInResponseDTO> {
        dto.email = dto.email.toLowerCase();

        const user = await this.usersRepo.findUserByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        await this.passwordCheck(dto, user);

        const payload: JwtPayload = {
            userID: user.userID,
            username: user.username,
            email: user.email,
            role: user.role,
        };
        const authResponse: SignInResponseDTO = new SignInResponseDTO();
        authResponse.access_token = await this.jwtService.signAsync(payload);
        authResponse.role = user.role;

        return authResponse;
    }

    async passwordCheck(dto: SignInRequestDto, user: any): Promise<void> {
        const res = await bcrypt.compare(dto.password, user.password);
        if (!res) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(dto.password, salt);
        await this.usersRepo.updatePassword(user, newHashPassword);
    }
}
