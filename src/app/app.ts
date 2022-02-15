import { IApp } from "./app.interface";
import Fastify, { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../dependencies.types";
import { IConfigService, envVariable } from "../config";
import { ILogger } from "../logger";
import "reflect-metadata";

@injectable()
export class App implements IApp {
  private app: FastifyInstance;

  constructor(
    @inject(dependenciesType.IConfigService) private config: IConfigService,
    @inject(dependenciesType.ILogger) private logger: ILogger,
  ) {
    this.app = Fastify();
  }

  public async init() {
    const port = this.config.get(envVariable.APP_PORT);
    try {
      await this.app.listen(port);
      this.logger.log(`[APP] Server start listening to port ${port}`);
    } catch (e) {
      this.logger.error(`[APP] something went wrong`, e);
    }
  }
}
