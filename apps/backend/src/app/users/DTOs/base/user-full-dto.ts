import { Role } from '@common/Enums';
import { UserFull } from '@common/Interfaces';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserBaseDto } from './user-base.dto';

export class UserFullDto extends UserBaseDto implements UserFull {
    @IsString()
    userID: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsEnum(Role)
    role!: Role;
}
