import { FastifyReply } from "fastify";
import { HTTPError } from "../../error";

export default interface IBaseController {
  create(replay: FastifyReply): FastifyReply;
  ok<T>(replay: FastifyReply, response: T, code: number): void;
  error(replay: FastifyReply, error: HTTPError): void;
}
