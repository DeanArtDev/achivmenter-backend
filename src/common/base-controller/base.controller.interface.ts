import { FastifyReply } from "fastify";
import { HTTPError } from "../../error";

export default interface IBaseController {
  create<T>(replay: FastifyReply, response: T): void;
  ok<T>(replay: FastifyReply, response: T, code: number): void;
  error(replay: FastifyReply, error: HTTPError): void;
}
