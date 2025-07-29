import { Role } from "@common/Enums";
import { SignInResponse } from "@common/Interfaces";

export class SignInResponseDTO implements SignInResponse{
    access_token!: string;
    role!: Role; 
}