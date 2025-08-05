import { Role } from '@common/Enums';
import { UserBase } from '../base';

export interface CreateUserRequest extends UserBase {
    password: string;
    role?: Role;
}
