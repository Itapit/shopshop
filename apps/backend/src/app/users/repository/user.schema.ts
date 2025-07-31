import { Role } from '@common/Enums';
import { UserFull } from '@common/Interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserSchema & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserSchema implements UserFull {
  _id: string;
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.Client })
  role: Role;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
