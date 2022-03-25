import fp from "fastify-plugin";
import { verify as verifyJWT } from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginCallback, FastifyPluginOptions } from "fastify/types/plugin";
import { HookHandlerDoneFunction } from "fastify/types/hooks";
import { FastifyInstance } from "fastify/types/instance";
import IAppPlugin from "./plugin.interface";

export default class AuthorizationPlugin implements IAppPlugin {
  constructor(private readonly secret: string) {}

  public readonly displayName = "Authorization Plugin";

  public install(): { pluginEntity: FastifyPluginCallback; options?: FastifyPluginOptions } {
    return { pluginEntity: fp(this.shapePluginEntity.bind(this)) };
  }

  private shapePluginEntity(instance: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction): void {
    instance.addHook("onRequest", this.onRequestCheckAuthorization);
    done();
  }

  private onRequestCheckAuthorization(request: FastifyRequest, _: FastifyReply, done: HookHandlerDoneFunction) {
    request.context.config = { ...request.context.config, authUser: null };

    if (request.headers.authorization) {
      verifyJWT(request.headers.authorization.split(" ")[1], this.secret, (err, payload) => {
        if (err || !payload) done();

        request.context.config = { ...request.context.config, authUser: payload as object };
        done();
      });
    }

    done();
  }
}
