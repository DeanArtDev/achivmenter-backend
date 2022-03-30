import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import IUserRepository from "./interfaces/user.repository.interface";
import User from "../entities/user.entity";
import { dependenciesType } from "../dependencies.types";
import { IDataBaseService } from "../database";

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(@inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService) {}

  public async getOne(email: UserModel["email"]): Promise<UserModel | null> {
    return await this.db.client.userModel.findFirst({ where: { email } });
  }

  public async createUser({ email, password }: User): Promise<UserModel> {
    return await this.db.client.userModel.create({ data: { email, hash: password } });
  }
}
