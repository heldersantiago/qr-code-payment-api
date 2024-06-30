import { UserController } from "../controllers/UserController";

export class UserRoutes {
  private readonly apiUrl: string = "/api/v1/users";
  public userController: UserController = new UserController();

  public routes(app: any): void {
    app.route(this.apiUrl).get(this.userController.getUsers);
    app.route(this.apiUrl).post(this.userController.createUser);
    app
      .route(this.apiUrl + "/:id")
      .get(this.userController.getUserById)
      .put(this.userController.updateUser)
      .delete(this.userController.deleteUser);
  }
}
