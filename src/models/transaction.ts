import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Transaction extends Model {
  id?: number;
  customerId!: number;
  sellerId!: number;
  productId!: number;
  quantity!: number;
  price!: number;
  status!: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "sellers",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
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
    tableName: "transactions",
    timestamps: true,
  }
);

Transaction.sync({ alter: true })
  .then(() => console.log("transactions table synced"))
  .catch((e) => {
    console.error("Error syncing transactions table", e);
  });
