import { UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import IUserRepository from "./user.repository.interface";
import { dependenciesType } from "../dependencies.types";
import { IDataBaseService } from "../database";
import "reflect-metadata";

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(@inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService) {}

  public async getOne(email: UserModel["email"]): Promise<UserModel | null> {
    return await this.db.client.userModel.findFirst({ where: { email } });
  }
}
