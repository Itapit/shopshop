import { CreateUserResponse } from "@common/Interfaces";
import { UserBaseDto } from "../base/user-base.dto";

export class CreateUserResponseDto implements CreateUserResponse {
    user!: UserBaseDto;
}