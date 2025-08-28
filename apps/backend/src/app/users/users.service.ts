import { UserBase } from '@common/Interfaces';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto, CreateUserResponseDto, UserBaseDto } from './DTOs';
import { IUsersRepository, USERS_REPOSITORY } from './repository/users-repository.interface';

@Injectable()
export class UsersService {
    constructor(@Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository) {}

    async createUser(createUserDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        const email = createUserDto.email.toLowerCase();
        const userCheck = await this.usersRepo.findUserByEmail(email);
        if(userCheck != null) 
             throw new HttpException('Email already in use', 400);
            
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const created = await this.usersRepo.createUser({
            username: createUserDto.username,
            email: email,
            password: hashedPassword,
            role: createUserDto.role,
        }); 
        
        const userDto = new UserBaseDto();
        userDto.username = created.username;
        userDto.email = created.email;

        const response = new CreateUserResponseDto();
        response.user = userDto;
        return response;
    }

    async getAllUsers(): Promise<UserBase[]> {
        return this.usersRepo.getAllUsers();
    }
}
