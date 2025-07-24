import { UserBase } from 'common/src/lib/Interfaces/user.interface';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<UserBase | null>;
  findUserById(id: string): Promise<UserBase | null>;
  createUser(user: Partial<UserBase>): Promise<UserBase>;
  getAllUsers(): Promise<UserBase[]>;
}
