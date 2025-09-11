import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { IUsersRepository, USERS_REPOSITORY } from '../users/repository/users-repository.interface';
import { AUTH_COOKIE } from './auth.constants';
import { SignInResponseDTO } from './DTOs';
import { SignInRequestDto } from './DTOs/request/sign-In-request.dto';
import { GetProfileResponseDto } from './DTOs/response/Get-Profile-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInRequestDto, res: Response): Promise<SignInResponseDTO> {
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
        const accessToken = await this.jwtService.signAsync(payload);

        res.cookie(AUTH_COOKIE.NAME, accessToken, {
            httpOnly: true,
            secure: AUTH_COOKIE.SECURE,
            sameSite: AUTH_COOKIE.SAME_SITE,
            maxAge: AUTH_COOKIE.MAX_AGE_MS,
            path: AUTH_COOKIE.PATH,
        });

        const responseDto = new SignInResponseDTO();
        responseDto.message = 'Signed in successfully';
        return responseDto;
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

    async GetUserDataFromJWT(payload: JwtPayload): Promise<GetProfileResponseDto> {
        const dto = new GetProfileResponseDto();
        dto.userID = payload.userID;
        dto.email = payload.email;
        dto.username = payload.username;
        dto.role = payload.role;
        return dto;
    }

    logout(res: Response): any {
        res.clearCookie(AUTH_COOKIE.NAME, {
            httpOnly: true,
            sameSite: AUTH_COOKIE.SAME_SITE,
            secure: AUTH_COOKIE.SECURE,
            path: AUTH_COOKIE.PATH,
        });

        return { message: 'Logout successful' };
    }
}
