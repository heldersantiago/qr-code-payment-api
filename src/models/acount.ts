import { DataTypes, Model } from "sequelize";
import { database } from "../config/database";

export class Account extends Model {
  id?: number;
  userId?: number;
  identifier!: number;
  balance!: number;
}
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    identifier: { type: DataTypes.BIGINT, allowNull: false },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
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
