import path from "path";
import { Product } from "../models/product";
import QRCode from "qrcode";
export class ProductUtils {
  public static generateRandomUniqueIdentifier(): number {
    const identifier = Math.floor(100000 + Math.random() * 900000);
    return identifier;
  }
  public static async generateProductQRCode(product: Product) {
    try {
      const productData = {
        id: product.id,
        name: product.name,
        price: product.price,
        seller: product.sellerId,
      };

      const qrCodeData = JSON.stringify(productData);

      const id = ProductUtils.generateRandomUniqueIdentifier();

      const qrCodeFilePath = path.join(
        __dirname,
        `../../public/qrcodes/product_${id}.png`
      );

      await QRCode.toFile(qrCodeFilePath, qrCodeData);

      return `public/qrcodes/product_${id}.png`;
    } catch (error) {
      throw new Error("Error generating QR code");
    }
  }
}
