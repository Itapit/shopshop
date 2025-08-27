import { Role } from '@common/Enums';
import { UserBase } from './User-Base.interface';

export interface UserFull extends UserBase {
    userID?: string;
    password: string;
    role: Role;
}
