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
    name: {type:DataTypes.STRING, allowNull:false},
    description: DataTypes.TEXT,
    price: {type:DataTypes.DECIMAL(10, 2),allowNull:false},
    quantity: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    qrcodeUrl: {type:DataTypes.STRING, allowNull:false},
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
