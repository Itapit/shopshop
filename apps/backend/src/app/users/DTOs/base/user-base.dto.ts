import { UserBase } from "@common/Interfaces";
import { IsEmail, IsString } from "class-validator";

export class UserBaseDto implements UserBase {
    @IsString()
    username!: string;
    @IsEmail()
    email!: string;
}