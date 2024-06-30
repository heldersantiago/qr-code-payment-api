import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Product extends Model {
  id?: number;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  sellerId!: number;
  qrcodeUrl!: string;
}

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
    sellerId: {
      type: DataTypes.INTEGER,
    },
    qrcodeUrl: DataTypes.STRING,
  },
  {
    sequelize: database,
    tableName: "products",
    timestamps: true,
  }
);

Product.sync({ alter: true })
  .then(() => console.log("products table synced"))
  .catch((e) => {
    console.error("Error syncing products table", e);
  });
