import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../Enums/role.enum';
import { UserBase } from '../../Interfaces/user.interface';

export class CreateUserRequestDto implements UserBase {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}