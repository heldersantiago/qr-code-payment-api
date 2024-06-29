import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { Product } from "../models/product";

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    sellerId: DataTypes.INTEGER,
  },
  {
    sequelize: database,
    modelName: "product",
    tableName: "products",
    timestamps: true,
  }
);

Product.sync({ alter: true })
  .then(() => console.log("products table synced"))
  .catch((e) => {
    console.error("Error syncing products table", e);
  });
