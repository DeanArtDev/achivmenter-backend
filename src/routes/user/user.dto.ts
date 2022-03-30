import { UserModel } from "@prisma/client";

export type LoginResponseDTO = {
  user: Omit<UserModel, "hash">;
  token: string;
};
export type LoginRequestDTO = Pick<UserModel, "email" | "hash"> & { password: string };

export type RegistrationResponseDTO = {
  user: Omit<UserModel, "hash">;
  token: string;
};
export type RegistrationRequestDTO = Omit<UserModel, "id" | "hash"> & { password: string };
