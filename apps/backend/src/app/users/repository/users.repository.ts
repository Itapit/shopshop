import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './users.schema';
import { IUsersRepository } from './users-repository.interface';
import { User } from 'common/src/lib/Interfaces/user.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
    return doc ? this.toUser(doc) : null;
  }

  async findUserById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.toUser(doc) : null;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const created = new this.userModel(user);
    const saved = await created.save();
    return this.toUser(saved);
  }

  async getAllUsers(): Promise<User[]> {
    const docs = await this.userModel.find().exec();
    return docs.map(this.toUser);
  }

  
  private toUser(doc: UserDocument): User {
    return {
      username: doc.username,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    };
  }
}
