import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Transaction extends Model {
  id?: number;
  customerId!: number;
  sellerId!: number;
  productId!: number;
  quantity!: number;
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
      allowNull:false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    quantity: DataTypes.INTEGER,
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
