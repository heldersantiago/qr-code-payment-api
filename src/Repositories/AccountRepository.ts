// src/repositories/AccountRepository.ts
import { Account } from "../models/acount";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository {
  public async getAccounts(): Promise<Account[]> {
    return await Account.findAll();
  }

  public async getAccountById(id: number): Promise<Account | null> {
    return await Account.findByPk(id);
  }

  public async createAccount(account: Account): Promise<Account> {
    return await Account.create({
      userId: account.userId,
      identifier: account.identifier,
      balance: account.balance,
    });
  }

  public async updateAccount(account: Account): Promise<Account> {
    await Account.update(account, { where: { id: account.id } });
    return this.getAccountById(account.id!) as Promise<Account>;
  }

  public async deleteAccount(id: number): Promise<void> {
    const account = await Account.findByPk(id);
    if (!account) {
      throw new Error("Account not found");
    }
    await account.destroy();
  }

  public async getAccountTransactions(accountId: number): Promise<any> {
    // return await Transaction.findAll({ where: { accountId } });
  }

  public async getAccountByUserId(userId: number): Promise<Account | null> {
    return await Account.findOne({ where: { userId } });
  }

  public async getAccountByIdentifier(identifier: number): Promise<Account | null> {
    return await Account.findOne({ where: { identifier } });
  }
}
