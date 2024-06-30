import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Notification extends Model {
  id?: number;
  userId!: number;
  message!: string;
  isRead!: boolean;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
  },
  {
    sequelize: database,
    tableName: "notifications",
    timestamps: true,
  }
);

Notification.sync({ alter: true })
  .then(() => console.log("notifications table synced"))
  .catch((e) => {
    console.error("Error syncing notifications table", e);
  });
