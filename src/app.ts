import express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/UserRoutes";

class App {
  public app: express.Application;
  //   public rolesPermissionsRoutes: RolePermissionRoutes =
  //     new RolePermissionRoutes();
  public userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.userRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
