import { Product } from "../models/product";

export class AccountUtils {
  public static generateRandomUniqueIdentifier(): number {
    const identifier = Math.floor(100000000000 + Math.random() * 900000000000);
    return identifier;
  }
}
