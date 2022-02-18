import { inject, injectable } from "inversify";
import { IBaseController } from "./base.controller.interface";
import { dependenciesType } from "../dependencies.types";
import { ILogger } from "../logger";
import "reflect-metadata";


@injectable()
export default class BaseController implements IBaseController {
  constructor(@inject(dependenciesType.ILogger) private logger: ILogger) {}

}
