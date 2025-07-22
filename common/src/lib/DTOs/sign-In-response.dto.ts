import { Role } from "../Enums/role.enum";


export class SignInResponse {
    access_token!: string;
    role!: Role; 
}