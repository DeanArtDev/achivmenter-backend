import IMiddleware from "./interfaces/middlevare.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import { HookHandlerDoneFunction } from "fastify/types/hooks";

export default class AuthGuardMiddleware implements IMiddleware {
  execute(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    if (reply.context.config.authUser) return done();
    reply.code(401).send({ message: "Unauthorised" });
  }
}
