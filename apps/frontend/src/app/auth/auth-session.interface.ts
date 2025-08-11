import { Role } from '@common/Enums';

export interface AuthSession {
    username: string;
    email: string;
    role: Role;
}
