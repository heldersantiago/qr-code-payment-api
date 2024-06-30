import { Product } from "../models/product";

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
