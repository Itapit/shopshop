import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'common/src/lib/DTOs/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }
}