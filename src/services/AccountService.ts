import { AccountRepository } from "../Repositories/AccountRepository";
import { Account } from "../models/acount";
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
    const fromAccount = await this.accountRepository.getAccountByUserId(
      fromAccountId
    );
    const toAccount = await this.accountRepository.getAccountByUserId(
      toAccountId
    );

    if (!fromAccount) {
      throw new Error("Account not found");
    }

    if (!toAccount) {
      throw new Error("Account not found");
    }

    if (parseFloat(fromAccount.balance as any) < amount) {
      throw new Error("Insufficient funds");
    }
    if (parseFloat(fromAccount.balance as any) - amount < 0) {
      throw new Error("Insufficient funds");
    }

    await  fromAccount.update(
      {
        balance: parseFloat(fromAccount.balance as any) - amount,
      }
    );
    await toAccount.update(
      {
        balance: parseFloat(toAccount!.balance as any) + amount,
      },
    );
  }
  public async getAccountTransactions(accountId: number): Promise<any> {
    return await this.accountRepository.getAccountTransactions(accountId);
  }
  public async getAccountsByUserId(userId: number): Promise<Account | null> {
    return await this.accountRepository.getAccountByUserId(userId);
  }

  public async sendFund(amount: number, toAccountId: number): Promise<any> {
    const account = await this.accountRepository.getAccountByIdentifier(toAccountId);
    if (!account) {
      throw new Error("Account not found");
    }
    await account.update(
      { balance: parseFloat(account.balance as any) + amount },
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
