import { Role } from "@common/Enums";
import { UserBase, UserFull } from "../base";

export interface CreateUserRequest extends UserBase {
    password:string;
    role?:Role;
}