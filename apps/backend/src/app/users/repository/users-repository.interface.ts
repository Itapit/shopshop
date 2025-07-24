import { UserBase } from 'common/src/lib/Interfaces/user-base.interface';
import { UserFull } from 'common/src/lib/Interfaces/user-full.interface';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<UserFull | null>;
  createUser(user: Partial<UserFull>): Promise<UserBase>;
  getAllUsers(): Promise<UserBase[]>;
}
