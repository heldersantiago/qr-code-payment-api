// src/services/UserService.ts
import { AccountRepository } from "../Repositories/AccountRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { User } from "../models/user";
import { AccountUtils } from "../utils/account";
import AccountService from "./AccountService";

class UserService {
  private userRepository: UserRepository;
  private accountRepository: AccountRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.accountRepository = new AccountRepository();
  }

  async getAllUsers(): Promise<any> {
    return await this.userRepository.UfindAll();
  }
  async createUser(user: User): Promise<User> {
    if (!user) {
      throw new Error("User object is required");
    }
    return await this.userRepository.create(user).then((userCreated) => {
      AccountService.createAccount(userCreated.id!);
      return userCreated;
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

export default new UserService();
