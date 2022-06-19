import { inject, injectable } from "inversify";
import IUserService from "./user.service.interface";
import IUserRepository from "../../../repositories/interfaces/user.repository.interface";
import { RegistrationRequestDTO } from "../user.dto";
import { envVariable, IConfigService } from "../../../config";
import { UserModel } from "@prisma/client";
import { HTTPError } from "../../../error";
import { dependenciesType } from "../../../dependencies.types";
import User from "../../../entities/user.entity";

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject(dependenciesType.IUserRepository) private readonly userRepository: IUserRepository,
    @inject(dependenciesType.IConfigService) private readonly configService: IConfigService,
  ) {}

  public async checkUser(email: UserModel["email"]): Promise<UserModel | null> {
    const userModel = await this.userRepository.getOne(email);

    if (userModel) return userModel;
    return null;
  }

  public async createUser({ email, password }: RegistrationRequestDTO): Promise<UserModel | null> {
    if (!email || !password) throw new HTTPError(400, "Both fields should be fill", { email, password });
    const isUserExisted = await this.userRepository.getOne(email);
    if (isUserExisted) return null;

    const newUser = new User(email, password);
    console.log("env", this.configService.get(envVariable.API_SALT));
    await newUser.encodePassword(password, Number(this.configService.get(envVariable.API_SALT)));
    return await this.userRepository.createUser(newUser);
  }
}
