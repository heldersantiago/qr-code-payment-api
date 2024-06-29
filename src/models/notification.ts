import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Notification extends Model {
  id?: number;
  userId!: number;
  message!: string;
  isRead!: boolean;
}
