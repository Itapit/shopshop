import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'common/src/lib/DTOs/sign-In.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  } 
   
  @Get()
  test()
  {
    return { message: 'Auth module is working'
  }  

  
} 

 @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req['user']; 
  }


}
