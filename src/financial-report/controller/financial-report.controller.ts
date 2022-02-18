import { inject, injectable } from "inversify";
import { AppRoute } from "../types/route.types";
import IFinancialReportController from "./financial-report.controller.interface";
import { dependenciesType } from "../dependencies.types";
import { ILogger } from "../logger";
import "reflect-metadata";

@injectable()
export default class FinancialReportController implements IFinancialReportController {
  constructor(@inject(dependenciesType.ILogger) private logger: ILogger) {}

  public async getAll(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(["hello"]), 100);
    });
  }

  public routes: AppRoute[] = [
    {
      url: "/financial-report",
      method: "GET",
      handler: (request, reply) => {
        reply.send(333);
      },
    },
  ];
}
