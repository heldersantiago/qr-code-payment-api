import { AccountController } from "../controllers/AccountController";
import auth from "../middlewares/auth";

export class AccountsRoutes {
  private readonly apiUrl: string = "/api/v1/accounts";
  public accountController: AccountController = new AccountController();

  public routes(app: any): void {
    app.route(this.apiUrl).get(this.accountController.getAccounts);
    app.route(this.apiUrl).post(auth, this.accountController.createAccount);
    app
      .route(this.apiUrl + "/transfer")
      .post(this.accountController.transferFunds);
    app
      .route(this.apiUrl + "/send-funds")
      .post(this.accountController.sendFund);
    app
      .route(this.apiUrl + "/withdraw-funds")
      .post(this.accountController.withdrawFund);
    app
      .route(this.apiUrl + "/:id")
      .get(this.accountController.getAccountById)
      .put(this.accountController.updateAccount)
      .delete(this.accountController.deleteAccount);
    app
      .route(this.apiUrl + "/user/:userId")
      .get(this.accountController.getAccountsByUserId);
  }
}
