import { injectable } from "inversify";
import { FastifyReply } from "fastify";
import IBaseController from "./base.controller.interface";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";

@injectable()
export default class BaseController implements IBaseController {
  protected routes: AppRoute[] = [];

  constructor(private logger: ILogger) {}

  public create(replay: FastifyReply): FastifyReply {
    this.logger.log("[BaseController CREATE]", `${replay.request.method}:${replay.request.url}`, `CODE: 201`)
    return replay.status(201);
  }

  public ok<T>(replay: FastifyReply, response: T, code: number = 200): void {
    replay.status(code).send(response);
    this.logger.log("[BaseController OK]", `${replay.request.method}:${replay.request.url}`, `CODE: ${code}`);
  }
}
