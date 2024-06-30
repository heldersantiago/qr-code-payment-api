// src/repositories/IUserRepository.ts

import { User } from "../models/user";

export interface IUserRepository {
  UfindAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
