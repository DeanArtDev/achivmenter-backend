import { inject, injectable } from "inversify";
import fastifyCors, { FastifyCorsOptions, FastifyCorsOptionsDelegate } from "fastify-cors";
import { FastifyPluginCallback, FastifyPluginOptions } from "fastify/types/plugin";
import { ILogger } from "../../logger";
import { FastifyRequest } from "fastify";
import { IConfigService } from "../../config";
import IAppPlugin from "./plugin.interface";
import { dependenciesType } from "../../dependencies.types";
import envVariable from "../../config/env.variable";
import "reflect-metadata";

@injectable()
export default class CorsPlugin implements IAppPlugin {
  private get availableOrigins(): string[] {
    return [this.devClientURL];
  }

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IConfigService) private config: IConfigService,
  ) {}

  public displayName = "CORSPlugin";

  public install(): { pluginEntity: FastifyPluginCallback; options: FastifyPluginOptions } {
    return {
      pluginEntity: fastifyCors,
      options: this.getOptions.bind(this),
    };
  }

  private getOptions(): FastifyCorsOptionsDelegate {
    return (
      request: FastifyRequest,
      callback: (error: Error | null, corsOptions?: FastifyCorsOptions) => void,
    ): void => {
      let corsOptions: FastifyCorsOptions;
      let error: Error | null = null;

      corsOptions = { origin: this.checkOrigin(request.headers) };

      callback(error, corsOptions);
    };
  }

  private get devClientURL(): string {
    return `${this.config.get(envVariable.CLIENT_URL)}:${this.config.get(envVariable.CLIENT_PORT)}`;
  }

  private checkOrigin(headers: FastifyRequest["headers"]): boolean {
    if (!headers.origin) return false;
    return this.availableOrigins.some((o) => o === headers.origin);
  }
}