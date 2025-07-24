import { User } from 'common/src/lib/Interfaces/user.interface';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  createUser(user: Partial<User>): Promise<User>;
  getAllUsers(): Promise<User[]>;
}
