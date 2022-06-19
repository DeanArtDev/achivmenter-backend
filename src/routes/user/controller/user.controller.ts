import { inject, injectable } from "inversify";
import IUserService from "../service/user.service.interface";
import IUserController from "./user.controller.interface";
import { AppRoute } from "../../../types/route.types";
import { IJWTService } from "../../../services/jwt-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { ILogger } from "../../../logger";
import { LoginRequestDTO, LoginResponseDTO, RegistrationRequestDTO, RegistrationResponseDTO } from "../user.dto";
import { BaseController } from "../../../common/base-controller";
import User from "../../../entities/user.entity";
import { HTTPError } from "../../../error";
import { dependenciesType } from "../../../dependencies.types";

//todo: [-] добавить схему валидации
//todo: [-] добавить обработку exceptions

@injectable()
export default class UserController extends BaseController implements IUserController {
  private readonly url = "/user";

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IUserService) private readonly userService: IUserService,
    @inject(dependenciesType.IJWTService) private readonly jwtService: IJWTService,
  ) {
    super(loggerService);
  }

  public routes: AppRoute[] = [
    {
      url: this.url + "/login",
      method: "PUT",
      handler: this.onUserLogin.bind(this),
    },
    {
      url: this.url + "/registration",
      method: "POST",
      handler: this.onUserRegister.bind(this),
    },
  ];

  private async onUserLogin(request: FastifyRequest<{ Body: LoginRequestDTO }>, replay: FastifyReply): Promise<void> {
    const { email, password } = request.body;

    const userModel = await this.userService.checkUser(email);
    if (!userModel) return this.error(replay, new HTTPError(404, "There is no such user."));

    const loggingInUser = new User(userModel.email, userModel.hash);
    const isCorrectPassword = await loggingInUser.comparePassword(password);
    if (isCorrectPassword) {
      const jwt = await this.jwtService.sign({ email: userModel.email });
      this.ok<LoginResponseDTO>(replay, { user: { id: userModel.id, email: userModel.email }, token: jwt });
      return;
    }

    this.error(replay, new HTTPError(403, "Email or Password is incorrect"));
  }

  private async onUserRegister(
    request: FastifyRequest<{ Body: RegistrationRequestDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const newUser = await this.userService.createUser(request.body);
    if (!newUser) return this.error(replay, new HTTPError(409, "User with this email address already exists"));
    console.log("user", newUser);
    const { id, email } = newUser;
    const token = await this.jwtService.sign({ email });
    console.log("token", token);
    this.ok<RegistrationResponseDTO>(replay, { user: { id, email }, token });
  }
}
