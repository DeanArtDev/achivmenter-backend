import IConfigService from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../dependencies.types";
import { ILogger } from "../logger";
import { DEV_MODE } from "../consts";
import envVariable from "./env.variable";
import "reflect-metadata";

@injectable()
export default class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  constructor(@inject(dependenciesType.ILogger) private readonly loggerService: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error("[ConfigService] cannot read '.env.prod' file or it is not existed", result.error);
    }
    this.config = result.parsed as DotenvParseOutput;
  }

  public get(key: envVariable): string {
    return this.config[key];
  }

  public get isDevelopmentMode(): boolean {
    return this.get(envVariable.NODE_ENV) === DEV_MODE;
  }
}
