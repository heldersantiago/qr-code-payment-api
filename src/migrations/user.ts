import { DataTypes } from "sequelize";
import { database } from "../config/database";
import { UserRole } from "../enums/userRole";
import { User } from "../models/user";

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    account: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.CUSTOMER,
    },
  },
  {
    sequelize: database,
    modelName: "seller",
    tableName: "sellers",
    timestamps: true,
  }
);

User.sync({ alter: true })
  .then(() => console.log("sellers table synced"))
  .catch((e) => {
    console.error("Error syncing sellers table", e);
  });
