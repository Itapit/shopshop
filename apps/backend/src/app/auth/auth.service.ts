import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';
import { SignInRequestDto } from '../users/DTOs/request/sign-In-request.dto';
import { IUsersRepository, USERS_REPOSITORY } from '../users/repository/users-repository.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInRequestDto, res: Response): Promise<{ message: string }> {
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

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        return { message: 'Logged in!' };
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
