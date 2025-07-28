import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './user.schema';
import { IUsersRepository } from './users-repository.interface';
import { UserBase, UserFull } from '@common/Interfaces';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  async findUserByEmail(email: string): Promise<UserFull | null> {
    const doc = await this.userModel.findOne({email: email.toLowerCase()}).exec()
    return doc ? this.toUserFull(doc) : null;
  }

  async createUser(user: UserFull): Promise<UserBase> {
    const created = new this.userModel(user);
    const saved = await created.save();
    return this.toUserBase(saved);
  }

  async getAllUsers(): Promise<UserBase[]> {
    const docs = await this.userModel.find().exec();
    return docs.map(this.toUserBase);
  }
  
  private toUserFull(doc: UserDocument): UserFull {
    return {
      username: doc.username,
      email: doc.email,
      password: doc.password,
      role: doc.role,
    };
  }

 async updatePassword(doc: UserDocument, newPassword: string): Promise<UserBase | null> {
  const result = await this.userModel.updateOne(
    { email: doc.email},
    { $set: { password: newPassword } }
  ).exec();
  

  const updatedDoc = await this.userModel.findById(doc._id).exec();
  return updatedDoc ? this.toUserBase(updatedDoc) : null;
}

  private toUserBase(doc: UserDocument): UserBase {
    return {
      username: doc.username,
      email: doc.email,
    };
  } 
}
