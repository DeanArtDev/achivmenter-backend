import IJWTService from "./jwt.service.interface";
import { sign, verify as jwtVerify } from "jsonwebtoken";
import { JWTPayload } from "./types";
import { envVariable, IConfigService } from "../../config";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../../dependencies.types";
import "reflect-metadata";

const JWT_ALGORITHM = "HS256";

@injectable()
export default class JWTService implements IJWTService {
  constructor(@inject(dependenciesType.IConfigService) private configService: IConfigService) {}

  public sign<T extends Record<string, any>>(payload: T): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        { ...payload, iat: Math.floor(Date.now() / 1000) },
        this.secret,
        { algorithm: JWT_ALGORITHM },
        (err, token) => {
          if (err) reject(err);
          resolve(token as string);
        },
      );
    });
  }

  public async verify(token: string): Promise<JWTPayload | null> {
    return new Promise((resolve, reject) => {
      jwtVerify(token, this.secret, (err, payload) => {
        if (err || !payload) reject(null);
        resolve(payload as JWTPayload);
      });
    });
  }

  private get secret(): string {
    return this.configService.get(envVariable.API_JWT_SECRET);
  }
}
