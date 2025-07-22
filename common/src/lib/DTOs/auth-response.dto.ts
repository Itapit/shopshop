import { Role } from "../Enums/role.enum";


export class AuthResponseDto {
    access_token!: string;
    role!: Role; 
}