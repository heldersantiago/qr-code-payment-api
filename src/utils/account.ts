import { Product } from "../models/product";

export class AccountUtils {
  public static generateRandomUniqueIdentifier(): number {
    const identifier = Math.floor(100000 + Math.random() * 900000);
    return identifier;
  }
}
