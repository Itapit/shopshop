import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from '@common/Enums';
import { CreateUserRequest } from '@common/Interfaces';

export class CreateUserRequestDto implements CreateUserRequest {
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsOptional()
    @IsEnum(Role)
    role!: Role;
}
