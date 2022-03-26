import { UserModel } from "@prisma/client";
import { RegistrationRequestDTO } from "../user.dto";

export default interface IUserService {
  checkUser(email: UserModel["email"]): Promise<UserModel | null>;
  createUser(user: RegistrationRequestDTO): Promise<UserModel | null>;
}
