import { Request, Response } from "express";
import { Product } from "../models/product";
import ProductService from "../services/ProductService";

export class ProductController {
  public getProducts(req: Request, res: Response) {
    const products = Product.findAll({ limit: 100 });
    res.status(200).json(products);
  }
  public async createProduct(req: Request, res: Response) {
    const newProduct = req.body;
    try {
      const createdProduct = await ProductService.createProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  public async getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    try {
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
