import { HTTPMethods, RouteHandlerMethod, RouteShorthandOptions, FastifyReply } from "fastify";

export type AppRoute = {
  url: string;
  method: keyof Pick<HTTPMethods, "DELETE" | "GET" | "PATCH" | "POST" | "PUT">;
  handler: (request: FastifyRequest, replay: FastifyReply) => void;
  schema?: RouteSchema;
  hooks?: RouteHookMap;
};

type RouteHooks = Pick<RouteShorthandOptions, "onRequest" | "onResponse" | "onError" | "preHandler">;
type RouteSchema = RouteShorthandOptions["schema"];
type RouteHookMap = {
  [I in keyof RouteHooks]: RouteHooks[I];
};
