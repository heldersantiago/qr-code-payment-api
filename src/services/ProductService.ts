import { ProductRepository } from "../Repositories/ProductRepository";
import { Product } from "../models/product";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(product: Product): Promise<Product> {
    // Perform any business logic here before creating the product
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
