import express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/UserRoutes";
import { AccountsRoutes } from "./routes/AccountRoutes";
import { ProductRoutes } from "./routes/ProductRoutes";
import path from "path";
import { AuthRoutes } from "./routes/AuthRoutes";

class App {
  public app: express.Application;
  public userRoutes: UserRoutes = new UserRoutes();
  public accountRoutes: AccountsRoutes = new AccountsRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.userRoutes.routes(this.app);
    this.accountRoutes.routes(this.app);
    this.productRoutes.routes(this.app);
    this.authRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
