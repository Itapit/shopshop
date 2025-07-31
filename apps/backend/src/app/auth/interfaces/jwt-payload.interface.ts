import { Role } from "@common/Enums";

export interface JwtPayload {
    userID: string; 
    username: string;
    email: string;
    role: Role
}