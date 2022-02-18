import envVariable from "./env.variable";

export default interface IConfigService {
  get(key: envVariable): string;
  get isDevelopmentMode(): boolean;
}
