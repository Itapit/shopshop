import { Role } from "@common/Enums";

export interface JwtPayload {
    username: string;
    email: string;
    role: Role
}