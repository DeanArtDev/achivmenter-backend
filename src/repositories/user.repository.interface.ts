import { UserModel } from "@prisma/client";

export default interface IUserRepository {
  getOne(id: UserModel["email"]): Promise<UserModel | null>;
}
