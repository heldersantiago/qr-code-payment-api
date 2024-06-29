import { Model } from "sequelize";
import { UserRole } from "../enums/userRole";

export class User extends Model {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
  phone!: string;
  accountId!: number;
  role!: UserRole;
}
