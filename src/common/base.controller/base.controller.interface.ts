import {FastifyReply} from "fastify";

export default interface IBaseController {
  create(replay: FastifyReply): FastifyReply;
  ok<T>(replay: FastifyReply, response: T, code: number): void
}
