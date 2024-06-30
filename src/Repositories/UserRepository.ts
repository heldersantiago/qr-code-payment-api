// src/repositories/UserRepository.ts
import { User } from "../models/user";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  public async UfindAll(): Promise<any> {
    return await User.findAndCountAll();
  }
  public async create(user: User): Promise<User> {
    return await User.create({
      email: user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
      role: user.role,
    });
  }

  public async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  public async update(user: User): Promise<User> {
    await User.update(user, { where: { id: user.id } });
    return this.findById(user.id!) as Promise<User>;
  }

  async delete(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }
}
