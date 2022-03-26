import { UserModel } from "@prisma/client";
import User from "../../entities/user.entity";

export default interface IUserRepository {
  getOne(email: UserModel["email"]): Promise<UserModel | null>;
  createUser({ email, password }: User): Promise<UserModel>;
}
