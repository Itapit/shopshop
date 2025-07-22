import { Schema } from 'mongoose';
import { Role } from 'common/src/lib/Enums/role.enum';

export const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true, default: 'user' },
});