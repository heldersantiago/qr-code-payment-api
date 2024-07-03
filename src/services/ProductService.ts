import { ProductRepository } from "../Repositories/ProductRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { Product } from "../models/product";
import { ProductUtils } from "../utils/product";

class ProductService {
  private productRepository: ProductRepository;
  private userRepository: UserRepository;

  constructor() {
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
  }

  async createProduct(product: Product): Promise<Product> {
    if (!product.price) {
      throw new Error("Product price is required");
    }
    if (!product.sellerId) {
      throw new Error("Product seller is required");
    }
    if (!product.name) {
      throw new Error("Product name is required");
    }

    const seller = this.userRepository.findById(product.sellerId);
    if (!seller) {
      throw new Error("Seller not found");
    }
    product.qrcodeUrl = await ProductUtils.generateProductQRCode(product);
    return await this.productRepository.create(product);
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async updateProduct(product: Product): Promise<Product> {
    return await this.productRepository.update(product);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

export default new ProductService();
