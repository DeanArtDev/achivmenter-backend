import IJWTService from "./jwt.service.interface";
import { sign, verify } from "jsonwebtoken";
import { envVariable, IConfigService } from "../../config";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../../dependencies.types";

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

  public async verify(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      verify(token, this.secret, (err, decoded) => {
        if (err) reject(false);
        if (decoded) resolve(!decoded);
      });
    });
  }

  private get secret(): string {
    return this.configService.get(envVariable.API_JWT_SECRET);
  }
}
