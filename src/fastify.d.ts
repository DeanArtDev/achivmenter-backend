import { FastifyContextConfig } from "fastify/types/context";
import { UserModel } from "@prisma/client";

declare module "fastify/types/context" {
  export interface FastifyContextConfig {
    authUser: Pick<UserModel, "email"> | null;
  }
}
