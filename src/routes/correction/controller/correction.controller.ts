import ICorrectionController from "./correction.controller.interface";
import { AppRoute } from "../../../types/route.types";
import { inject } from "inversify";
import { dependenciesType } from "../../../dependencies.types";
import { ILogger } from "../../../logger";
import IUserService from "../../user/service/user.service.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import { LoginRequestDTO } from "../../user/user.dto";
import { BaseController } from "../../../common/base-controller";

export default class CorrectionController extends BaseController implements ICorrectionController {
  private readonly url = "/corrections";
  public routes: AppRoute[] = [
    {
      url: this.url + "/create",
      method: "POST",
      handler: this.onCreateCorrection.bind(this),
    },
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IUserService) private readonly userService: IUserService,
  ) {
    super(loggerService);
  }

  private async onCreateCorrection(
    request: FastifyRequest<{ Body: LoginRequestDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    this.ok(replay, "HELLO");
  }
}
