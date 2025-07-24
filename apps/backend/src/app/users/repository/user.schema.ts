import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'common/src/lib/Enums/role.enum';
import { UserFull } from 'common/src/lib/Interfaces/user-full.interface';

export type UserDocument = UserSchema & Document;

@Schema({ collection: 'users' })
export class UserSchema implements UserFull {
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
