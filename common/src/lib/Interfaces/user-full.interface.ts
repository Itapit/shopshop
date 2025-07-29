import { Role } from '../Enums/role.enum';
import { UserBase } from './user-base.interface';

export interface UserFull extends UserBase {
    _id: string;
    password: string;
    role: Role;
} 