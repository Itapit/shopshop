import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'common/src/lib/DTOs/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'common/src/lib/Enums/role.enum';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }
}