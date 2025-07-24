import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './user.schema';
import { IUsersRepository } from './users-repository.interface';
import { UserBase } from 'common/src/lib/Interfaces/user.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(user: Partial<UserBase>): Promise<UserBase> {
    const created = new this.userModel(user);
    const saved = await created.save();
    return this.toUser(saved);
  }

  async getAllUsers(): Promise<UserBase[]> {
    const docs = await this.userModel.find().exec();
    return docs.map(this.toUser);
  }
  
  private toUser(doc: UserDocument): UserBase {
    return {
      username: doc.username,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    };
  }
}
