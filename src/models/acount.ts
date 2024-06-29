import { Model } from "sequelize";

export class Account extends Model {
  id?: number;
  userId!: number;
  amount!: number;
}
