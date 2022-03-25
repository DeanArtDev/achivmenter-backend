import { FastifyContextConfig } from "fastify/types/context";

declare module "fastify/types/context" {
  export interface FastifyContextConfig {
    authUser: object | null;
  }
}
