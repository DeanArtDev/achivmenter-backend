import { inject, injectable } from "inversify";
import HTTPError from "./http-error";
import { ILogger } from "../logger";
import { FastifyReply, FastifyRequest } from "fastify";
import IExceptionFilter from "./exception-filter.interface";
import { dependenciesType } from "../dependencies.types";
import "reflect-metadata";

@injectable()
export default class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(dependenciesType.ILogger) private loggerService: ILogger) {}

  catch(err: Error | HTTPError, request: FastifyRequest, replay: FastifyReply): void {
    if (err instanceof HTTPError) {
      this.loggerService.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
      replay.status(err.statusCode).send({ err: err.message });
    } else {
      this.loggerService.error(`${err.message}`);
      replay.status(500).send({ err: err.message });
    }
  }
}
