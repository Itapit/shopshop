import { UserBase } from 'common/src/lib/Interfaces/user.interface';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface IUsersRepository {
  createUser(user: Partial<UserBase>): Promise<UserBase>;
  getAllUsers(): Promise<{username: string}>;
}
