import { injectable } from "inversify";
import { FastifyReply } from "fastify";
import IBaseController from "./base.controller.interface";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";
import { HTTPError } from "../../error";

@injectable()
export default class BaseController implements IBaseController {
  protected routes: AppRoute[] = [];

  constructor(private logger: ILogger) {}

  public create<T>(replay: FastifyReply, response: T): void {
    this.logger.log("[BaseController CREATE]", `${replay.request.method}:${replay.request.url}`, `CODE: 201`);
    replay.status(201).send(response);
  }

  public ok<T>(replay: FastifyReply, response: T, code: number = 200): void {
    replay.status(code).send(response);
    this.logger.log("[BaseController OK]", `${replay.request.method}:${replay.request.url}`, `CODE: ${code}`);
  }

  public error(replay: FastifyReply, error: HTTPError): void {
    const { stack, ...others } = error;
    replay.status(error.statusCode).send(others);
    this.logger.log("[BaseController ERROR]", `${replay.request.method}:${replay.request.url}`, `CODE: ${error.statusCode}`);
  }
}
