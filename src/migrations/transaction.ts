import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { Transaction } from "../models/transaction";

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.STRING,
      references: {
        model: "customers",
        key: "id",
      },
    },
    sellerId: {
      type: DataTypes.STRING,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.STRING,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
  },
  {
    sequelize: database,
    modelName: "transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

Transaction.sync({ alter: true })
  .then(() => console.log("transactions table synced"))
  .catch((e) => {
    console.error("Error syncing transactions table", e);
  });
