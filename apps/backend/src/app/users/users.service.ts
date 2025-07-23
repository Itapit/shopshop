import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from 'common/src/lib/Interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'common/src/lib/DTOs/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword; 
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  } 

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();    
  }
}