import { FastifyContextConfig } from "fastify/types/context";

declare module "fastify" {
  export interface FastifyContextConfig {
    authUser: object | null;
  }
}
