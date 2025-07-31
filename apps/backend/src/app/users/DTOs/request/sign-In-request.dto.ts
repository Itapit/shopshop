import { SignInRequest } from '@common/Interfaces/users/request';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequestDto implements SignInRequest{
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}