import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from 'common/src/lib/Interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(data: { username: string; email: string; password: string; role: string }) {
    const createdUser = new this.userModel(data);
    return createdUser.save();
  }

  async getAllUsers() {
    return this.userModel.find().exec();
  }
}