import { Role } from '../Enums/role.enum';

export interface UserBase {
  username: string;
  email: string;
  password: string;
  role: Role;
}