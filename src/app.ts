import express from "express";
import * as bodyParser from "body-parser";

class App {
  public app: express.Application;
  //   public rolesPermissionsRoutes: RolePermissionRoutes =
  //     new RolePermissionRoutes();

  constructor() {
    this.app = express();
    this.config();
    // this.rolesPermissionsRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
