import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInResponseDTO } from './DTOs';
import { SignInRequestDto } from './DTOs/request/sign-In-request.dto';
import { GetProfileResponseDto } from './DTOs/response/Get-Profile-response.dto';
import { AuthGuard } from './guards/auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(
        @Body() signInDto: SignInRequestDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<SignInResponseDTO> {
        return this.authService.signIn(signInDto, res);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req: RequestWithUser): Promise<GetProfileResponseDto> {
        return this.authService.GetUserDataFromJWT(req.user);
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response): any {
        return this.authService.logout(res);
    }
}
