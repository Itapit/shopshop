import { Role } from "@common/Enums";

export interface SignInResponse {
    access_token:string;
    role: Role;
}