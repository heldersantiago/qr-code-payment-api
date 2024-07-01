// src/controllers/AccountController.ts
import { Request, Response } from "express";
import AccountService from "../services/AccountService";
import { Account } from "../models/acount";

export class AccountController {
  public async getAccounts(req: Request, res: Response): Promise<void> {
    try {
      const accounts = await AccountService.getAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async getAccountById(req: Request, res: Response): Promise<any> {
    const accountId = parseInt(req.params.id);
    try {
      const account = await AccountService.getAccountById(accountId);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async createAccount(req: Request, res: Response): Promise<void> {
    const { userId } = req.body.user.id;
    try {
      const account = await AccountService.createAccount(userId);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async updateAccount(req: Request, res: Response): Promise<any> {
    const accountId = parseInt(req.params.id);
    const updatedAccount = req.body;
    try {
      const account = await Account.findByPk(accountId);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      const user = await Account.update(updatedAccount, {
        where: {
          id: accountId,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async deleteAccount(req: Request, res: Response): Promise<void> {
    const accountId = parseInt(req.params.id);
    try {
      await AccountService.deleteAccount(accountId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async transferFunds(req: Request, res: Response): Promise<void> {
    const { fromAccountId, toAccountId, amount } = req.body;
    try {
      await AccountService.transferFunds(fromAccountId, toAccountId, amount);
      res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  }

  public async getAccountTransactions(
    req: Request,
    res: Response
  ): Promise<void> {
    const accountId = parseInt(req.params.id);
    try {
      const transactions = await AccountService.getAccountTransactions(
        accountId
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async getAccountsByUserId(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId);
    try {
      const accounts = await AccountService.getAccountsByUserId(userId);
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async sendFund(req: Request, res: Response): Promise<void> {
    const { amount, toAccountId } = req.body;
    try {
      await AccountService.sendFund(amount, toAccountId);
      res.status(200).json({ message: "Fund sent successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  public async withdrawFund(req: Request, res: Response): Promise<void> {
    const { amount, toAccountId } = req.body;
    try {
      await AccountService.withDrawFund(amount, toAccountId);
      res.status(200).json({ message: "Fund withdrawn successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
