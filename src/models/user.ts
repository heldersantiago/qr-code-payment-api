import { DataTypes, Model } from "sequelize";
import { UserRole } from "../enums/userRole";
import { database } from "../config/database";

export class User extends Model {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
  phone!: string;
  role!: UserRole;
}

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
    password: {type:DataTypes.STRING, allowNull:false},
    phone: {type:DataTypes.STRING, allowNull:false},
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      defaultValue: UserRole.CUSTOMER,
    },
  },
  {
    sequelize: database,
    tableName: "users",
    timestamps: true,
  }
);

User.sync({ alter: true })
  .then(() => console.log("users table synced"))
  .catch((e) => {
    console.error("Error syncing users table", e);
  });
