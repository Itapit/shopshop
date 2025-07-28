import { UserBase, UserFull } from "@common/Interfaces";

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<UserFull | null>;
  createUser(user: Partial<UserFull>): Promise<UserBase>;
  getAllUsers(): Promise<UserBase[]>;
  updatePassword(doc: UserFull, newPassword: string): Promise<UserBase | null>;
}
