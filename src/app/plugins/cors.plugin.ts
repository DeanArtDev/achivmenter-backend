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
      let corsOptions: FastifyCorsOptions = {};
      let error: Error | null = null;

      console.log(this.availableOrigins);
      console.log(request.headers);
      if (this.checkOrigin(request.headers)) {
        corsOptions = { origin: true };
      } else {
        error = new Error("FORBIDDEN");
      }

      callback(error, corsOptions);
    };
  }

  private get availableOrigins(): string[] {
    return this.config.get(envVariable.API_AVAILABLE_CORS).split(", ");
  }

  private checkOrigin(headers: FastifyRequest["headers"]): boolean {
    if (!headers.origin) return false;
    return this.availableOrigins.some((o) => headers.origin === o);
  }
}
