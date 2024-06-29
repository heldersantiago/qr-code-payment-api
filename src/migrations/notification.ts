import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { Notification } from "../models/notification";

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
    modelName: "notification",
    tableName: "notifications",
    timestamps: true,
  }
);

Notification.sync({ alter: true })
  .then(() => console.log("notifications table synced"))
  .catch((e) => {
    console.error("Error syncing notifications table", e);
  });
