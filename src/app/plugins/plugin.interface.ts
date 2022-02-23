import { FastifyPluginCallback, FastifyPluginOptions } from "fastify/types/plugin";

export type RegisterPluginType = {
  pluginEntity: FastifyPluginCallback;
  options: FastifyPluginOptions;
};

export default interface IAppPlugin {
  readonly displayName: string;
  install(): RegisterPluginType;
}
