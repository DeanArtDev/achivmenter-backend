import fp from "fastify-plugin";
import { inject, injectable } from "inversify";
import { FastifyRequest } from "fastify";
import { FastifyPluginCallback, FastifyPluginOptions } from "fastify/types/plugin";
import { HookHandlerDoneFunction } from "fastify/types/hooks";
import { FastifyInstance } from "fastify/types/instance";
import { IJWTService } from "../../services/jwt-service";
import { FastifyContextConfig } from "fastify/types/context";
import { JWTPayload } from "../../services/jwt-service/types";
import IAppPlugin from "./plugin.interface";
import { ILogger } from "../../logger";
import { dependenciesType } from "../../dependencies.types";
import "reflect-metadata";

@injectable()
export default class AuthorizationPlugin implements IAppPlugin {
  constructor(
    @inject(dependenciesType.IJWTService) private readonly jwtService: IJWTService,
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
  ) {}

  public readonly displayName = "Authorization Plugin";

  public install(): { pluginEntity: FastifyPluginCallback; options?: FastifyPluginOptions } {
    return { pluginEntity: fp(this.shapePluginEntity.bind(this)) };
  }

  private shapePluginEntity(instance: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction): void {
    instance.addHook("onRequest", this.onRequestCheckAuthorization.bind(this));
    done();
  }

  private async onRequestCheckAuthorization(request: FastifyRequest): Promise<void> {
    if (!request.headers.authorization) {
      request.context.config = this.setContextConfig(request.context.config, null);
      return;
    }

    try {
      const decodedTokenData = await this.jwtService.verify(request.headers.authorization.split(" ")[1]);
      request.context.config = this.setContextConfig(request.context.config, decodedTokenData);
    } catch (e) {
      request.context.config = this.setContextConfig(request.context.config, null);
      e !== null && this.loggerService.error(`[AuthorizationPlugin] Something went wrong with JWT verify`, e);
    }
  }

  private setContextConfig(oldConfig: FastifyContextConfig, jwtPayload: JWTPayload | null): FastifyContextConfig {
    if (jwtPayload) {
      return { ...oldConfig, authUser: { email: jwtPayload.email } };
    }
    return { ...oldConfig, authUser: null };
  }
}
