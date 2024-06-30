import { Account } from "../models/acount";

export interface IAccountRepository {
  getAccounts(): Promise<any>;
  getAccountById(id: number): Promise<any>;
  createAccount(account: Account): Promise<Account>;
  updateAccount(account: Account): Promise<Account>;
  deleteAccount(id: number): Promise<void>;
  getAccountTransactions(accountId: number): Promise<any>;
  getAccountByUserId(userId: number): Promise<any>;
}
