import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from 'common/src/lib/DTOs/users/sign-In-request.dto';
import { AuthGuard } from './guards/auth.guard';
import { SignInResponseDTO } from 'common/src/lib/DTOs/users/sign-In-response.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInRequestDto): Promise<SignInResponseDTO> {
    return this.authService.signIn(signInDto);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req['user']; 
  }
}
