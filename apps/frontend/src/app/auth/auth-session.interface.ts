import { Role } from "@common/Enums";

export interface AuthSession {
    token: string;
    role: Role;
}