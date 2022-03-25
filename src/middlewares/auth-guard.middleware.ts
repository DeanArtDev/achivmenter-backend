import IMiddleware from "./middlevare.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import { HookHandlerDoneFunction } from "fastify/types/hooks";

export default class AuthGuardMiddleware implements IMiddleware {
  execute(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    console.log("GUARD");
    done()
  }
}