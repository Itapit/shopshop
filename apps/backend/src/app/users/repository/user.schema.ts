import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserBase } from 'common/src/lib/Interfaces/user.interface';
import { Role } from 'common/src/lib/Enums/role.enum';

export type UserDocument = UserSchema & Document;

@Schema({ collection: 'users' })
export class UserSchema implements UserBase {
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
