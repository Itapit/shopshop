import { Role } from '@common/Enums';

export interface GetProfileResponse {
    userID: string;
    username: string;
    email: string;
    role: Role;
}
