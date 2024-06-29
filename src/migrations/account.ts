import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { Account } from "../models/acount";

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2),
  },
  {
    sequelize: database,
    modelName: "account",
    tableName: "accounts",
    timestamps: true,
  }
);

Account.sync({ alter: true })
  .then(() => console.log("accounts table synced"))
  .catch((e) => {
    console.error("Error syncing accounts table", e);
  });
