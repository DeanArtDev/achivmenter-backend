import HTTPError from "./http-error";
import { FastifyReply, FastifyRequest } from "fastify";


export default interface IExceptionFilter {
  catch(err: Error | HTTPError, request: FastifyRequest, replay: FastifyReply): void;
}
