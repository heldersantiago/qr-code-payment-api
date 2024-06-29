import { Model } from "sequelize";

export class Transaction extends Model {
  id?: number;
  customerId!: string;
  sellerId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
  status!: string;
}
