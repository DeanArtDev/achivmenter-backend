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

      console.log("headers", request.headers);
      console.log("hostname", request.hostname);
      console.log("ip", request.ip);
      console.log("url", request.url);
      console.log("method", request.method);
      console.log("routerPath", request.routerPath);
      console.log("routerMethod", request.routerMethod);

      corsOptions = { origin: this.availableOrigins };

      callback(error, corsOptions);
    };
  }

  private get availableOrigins(): string[] {
    return this.config.get(envVariable.API_AVAILABLE_CORS).split(", ");
  }
}
