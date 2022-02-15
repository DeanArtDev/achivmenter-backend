import IConfigService from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../dependencies.types";
import { ILogger } from "../logger";
import envVariable from "./env.variable";
import "reflect-metadata";

@injectable()
export default class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(dependenciesType.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error("[CONFIG SERVICE] cannot read '.env' file or it is not existed", result.error);
    }
    this.config = result.parsed as DotenvParseOutput;
  }

  public get(key: envVariable): string {
    return this.config[key];
  }
}
