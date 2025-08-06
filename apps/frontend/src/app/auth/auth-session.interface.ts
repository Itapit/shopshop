import { Role } from '@common/Enums';

export interface AuthSession {
    userID: string;
    username: string;
    email: string;
    role: Role;
}
