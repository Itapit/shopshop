import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SignInRequestDto } from '../users/DTOs/request/sign-In-request.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SignInRequestDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signIn(signInDto, res);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getProfile(@Req() req: RequestWithUser) {
        return req.user;
    }
}
