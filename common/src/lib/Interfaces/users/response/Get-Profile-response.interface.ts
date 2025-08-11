import { Role } from '@common/Enums';

export interface GetProfileResponse {
    username: string;
    email: string;
    role: Role;
}
