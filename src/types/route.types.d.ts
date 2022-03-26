import { FastifyReply, FastifyRequest, HTTPMethods } from "fastify";
import { RouteOptions } from "fastify/types/route";

export type AppRoute = Omit<RouteOptions, "method", "handler"> & {
  method: keyof Pick<HTTPMethods, "DELETE" | "GET" | "POST" | "PUT">;
  handler: (request: FastifyRequest, replay: FastifyReply) => Promise<void>;
};
