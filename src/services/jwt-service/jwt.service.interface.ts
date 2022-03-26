import { JWTPayload } from "./types";

export default interface IJWTService {
  sign<T extends Record<string, any>>(payload: T): Promise<string>;
  verify(token: string): Promise<JWTPayload | null>;
}
