import { Product } from "../models/product";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    return await Product.create({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      sellerId: product.sellerId,
      qrcodeUrl: product.qrcodeUrl,
    });
  }

  async findById(id: number): Promise<Product | null> {
    return await Product.findByPk(id);
  }

  async findAll(): Promise<Product[]> {
    return await Product.findAll();
  }

  async update(product: Product): Promise<Product> {
    await Product.update(product, { where: { id: product.id } });
    return this.findById(product.id!) as Promise<Product>;
  }

  async delete(id: number): Promise<void> {
    await Product.destroy({ where: { id } });
  }
}
