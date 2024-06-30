import { AccountRepository } from "../Repositories/AccountRepository";
import { Account } from "../models/acount";
import { Transaction } from "../models/transaction";
import { AccountUtils } from "../utils/account";

class AccountService {
  private accountRepository: AccountRepository;
  constructor() {
    this.accountRepository = new AccountRepository();
  }
  public async getAccounts(): Promise<Account[]> {
    return await this.accountRepository.getAccounts();
  }
  public async getAccountById(id: number): Promise<Account | null> {
    return await this.accountRepository.getAccountById(id);
  }
  public async createAccount(userId: number): Promise<Account> {
    const account = new Account();
    account.userId = userId;
    account.identifier = AccountUtils.generateRandomUniqueIdentifier();
    return await this.accountRepository.createAccount(account);
  }
  public async updateAccount(account: Account): Promise<Account> {
    return await this.accountRepository.updateAccount(account);
  }
  public async deleteAccount(id: number): Promise<void> {
    await this.accountRepository.deleteAccount(id);
  }
  public async transferFunds(
    fromAccountId: number,
    toAccountId: number,
    amount: number
  ): Promise<any> {
    const fromAccount = await this.accountRepository.getAccountById(
      fromAccountId
    );
    const toAccount = await this.accountRepository.getAccountById(toAccountId);

    if (!fromAccount) {
      throw new Error("Account not found");
    }

    if (!fromAccount) {
      throw new Error("Account not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    await Account.update(
      {
        balance: parseFloat(fromAccount.balance as any) - amount,
      },
      {
        where: {
          id: fromAccountId,
        },
      }
    );
    await Account.update(
      {
        balance: parseFloat(toAccount!.balance as any) + amount,
      },
      {
        where: {
          id: toAccountId,
        },
      }
    );
  }
  public async getAccountTransactions(accountId: number): Promise<any> {
    return await this.accountRepository.getAccountTransactions(accountId);
  }
  public async getAccountsByUserId(userId: number): Promise<Account[]> {
    return await this.accountRepository.getAccountByUserId(userId);
  }

  public async sendFund(amount: number, toAccountId: number): Promise<any> {
    const account = await Account.findByPk(toAccountId);
    console.log(account);
    if (!account) {
      throw new Error("Account not found");
    }
    await Account.update(
      { balance: parseFloat(account.balance as any) + amount },
      {
        where: {
          id: toAccountId,
        },
      }
    );
  }
  public async withDrawFund(amount: number, toAccountId: number): Promise<any> {
    const account = await this.accountRepository.getAccountById(toAccountId);
    if (!account) {
      throw new Error("Account not found");
    }
    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }
    await account.update({
      balance: parseFloat(account.balance as any) - amount,
    });
  }
}

export default new AccountService();
