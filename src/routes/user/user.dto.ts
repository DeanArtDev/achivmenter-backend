import { UserModel } from "@prisma/client";

export type LoginResponseDTO = {
  user: Omit<UserModel, "password">;
  token: string;
};
export type LoginRequestDTO = Pick<UserModel, "email" | "password">

export type RegistrationResponseDTO = {
  user: Omit<UserModel, "password">;
  token: string;
};
export type RegistrationRequestDTO = Omit<UserModel, "id">;
