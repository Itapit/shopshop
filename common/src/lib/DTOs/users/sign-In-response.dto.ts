import { Role } from "../../Enums/role.enum";

export class SignInResponseDTO {
    access_token!: string;
    role!: Role; 
}