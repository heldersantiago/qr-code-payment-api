import { ProductController } from "../controllers/ProductController";
import auth from "../middlewares/auth";

export class ProductRoutes {
  private readonly apiUrl: string = "/api/v1/products";
  public productController: ProductController = new ProductController();

  public routes(app: any): void {
    app.route(this.apiUrl).get(this.productController.getProducts);
    app.route(this.apiUrl).post(this.productController.createProduct);
    app
      .route(this.apiUrl + "/:id")
      .get(auth, this.productController.getProductById);
    // app
    //   .route(this.apiUrl + "/send-funds")
    //   .post(this.accountController.sendFund);
    // app
    //   .route(this.apiUrl + "/withdraw-funds")
    //   .post(this.accountController.withdrawFund);
    //   .put(this.accountController.updateAccount)
    //   .delete(this.accountController.deleteAccount);
  }
}
