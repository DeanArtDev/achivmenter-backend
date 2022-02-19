import { inject, injectable } from "inversify";
import { FinancialReportModel } from "@prisma/client";
import IFinancialReportController from "./financial-report.controller.interface";
import { dependenciesType } from "../../dependencies.types";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";
import { IFinancialReportService } from "../service";
import { FastifyReply, FastifyRequest } from "fastify";
import "reflect-metadata";

@injectable()
export default class FinancialReportController implements IFinancialReportController {
  //todo: add the validation schema
  private readonly url = "/financial-report"
  public readonly routes: AppRoute[] = [
    {
      url: this.url,
      method: "GET",
      handler: this.onGetHandler.bind(this),
    },
    {
      url: this.url,
      method: "POST",
      handler: this.onPostHandler.bind(this),
    }
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly logger: ILogger,
    @inject(dependenciesType.IFinancialReportService) private readonly financialReportService: IFinancialReportService,
  ) {}

  private async onGetHandler(_:FastifyRequest, replay: FastifyReply): Promise<void> {
    const reports = await this.financialReportService.getAll();
    replay.code(200).send(reports);
  }

  private async onPostHandler(request:FastifyRequest, replay: FastifyReply): Promise<void> {
    console.log(request.body);
    
    const reports = await this.financialReportService.createReport(request.body)
    // replay.code(200).send(reports);
  }
}
