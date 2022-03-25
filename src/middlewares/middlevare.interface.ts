import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { HookHandlerDoneFunction } from "fastify/types/hooks";

export default interface IMiddleware {
  execute(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void;
}
