import ILogger from "./logger.interface";
import { Logger } from "tslog";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayLoggerName: false,
      displayFunctionName: false,
      displayFilePath: "hidden",
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
