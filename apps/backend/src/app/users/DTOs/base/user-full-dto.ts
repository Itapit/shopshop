import { UserFull } from '@common/Interfaces';
import { UserBaseDto } from './user-base.dto';
import { Role } from '@common/Enums';
import { IsEnum, IsString, MinLength } from 'class-validator';

export class UserFullDto extends UserBaseDto implements UserFull {
    @IsString()
    userID: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsEnum(Role)
    role!: Role;
}
