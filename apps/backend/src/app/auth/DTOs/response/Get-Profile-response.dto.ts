import { Role } from '@common/Enums';
import { GetProfileResponse } from '@common/Interfaces';

export class GetProfileResponseDto implements GetProfileResponse {
    userID!: string;
    username!: string;
    email!: string;
    role!: Role;
}
