import { Model } from "sequelize";

export class Product extends Model {
  id?: number;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  sellerId!: number;
}
