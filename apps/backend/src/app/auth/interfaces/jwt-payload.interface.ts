import { Role } from "common/src/lib/Enums/role.enum";

export interface JwtPayload {
    username: string;
    email: string;
    role: Role
}