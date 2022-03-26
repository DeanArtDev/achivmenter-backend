import { UserModel } from "@prisma/client";

export type JWTPayload = {
  email: UserModel["email"];
  iat: number;
};
