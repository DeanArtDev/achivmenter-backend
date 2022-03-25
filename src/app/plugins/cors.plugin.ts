import fastifyCors, { FastifyCorsOptions, FastifyCorsOptionsDelegate } from "fastify-cors";
import { FastifyPluginCallback, FastifyPluginOptions } from "fastify/types/plugin";
import { FastifyRequest } from "fastify";
import IAppPlugin from "./plugin.interface";

export default class CorsPlugin implements IAppPlugin {
  constructor(private readonly availableOrigins: string[]) {}

  public readonly displayName = "CORS Plugin";

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

      corsOptions = { origin: this.availableOrigins };

      callback(error, corsOptions);
    };
  }
}
