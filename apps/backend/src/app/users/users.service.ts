import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUsersRepository, USERS_REPOSITORY } from './repository/users-repository.interface';
import { CreateUserRequestDto } from '@common/DTOs';
import { UserBase } from '@common/Interfaces';

@Injectable()
export class UsersService {
  constructor( @Inject(USERS_REPOSITORY) private readonly usersRepo: IUsersRepository ) {}

  async createUser(createUserDto: CreateUserRequestDto): Promise<UserBase> {
    const email = createUserDto.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepo.createUser({
      username: createUserDto.username,
      email: email,
      password: hashedPassword,
      role: createUserDto.role,
    });
  }

  async getAllUsers(): Promise<UserBase[]> {
    return this.usersRepo.getAllUsers();
  } 
}