import { Role } from '../Enums/role.enum';

export interface User {
  username: string;
  email: string;
  password: string;
  role: Role;
}