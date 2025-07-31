import { UserBase } from "../../Interfaces/user-base.interface";

export class CreateUserResponseDto implements UserBase {
    username!: string;
    email!: string;
}