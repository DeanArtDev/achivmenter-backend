import { inject, injectable } from "inversify";
import IFinancialReportController from "./financial-report.controller.interface";
import { dependenciesType } from "../../dependencies.types";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";
import { IFinancialReportService } from "../service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialReportResponseDTO } from "../dto/financial-report.dto";
import { validationSchemaOfCreate, validationSchemaOfGetAll } from "../financial-report.validation.schema";
import { FinancialPeriodModelComplete } from "../types";
import "reflect-metadata";

@injectable()
export default class FinancialReportController implements IFinancialReportController {
  //todo: add the validation schema
  private readonly url = "/financial-report";
  public readonly routes: AppRoute[] = [
    {
      url: this.url,
      method: "GET",
      schema: validationSchemaOfGetAll,
      handler: this.onGetAllHandler.bind(this),
    },
    {
      url: this.url,
      schema: validationSchemaOfCreate,
      method: "POST",
      handler: this.onCreateHandler.bind(this),
    },
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly logger: ILogger,
    @inject(dependenciesType.IFinancialReportService) private readonly financialReportService: IFinancialReportService,
  ) {}

  private async onGetAllHandler(_: FastifyRequest, replay: FastifyReply): Promise<void> {
    const reports = await this.financialReportService.getAll();
    replay.code(200).send(reports.map(this.reportAdapter));
  }

  private async onCreateHandler(
    request: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const report = await this.financialReportService.createReport({
      parts: request.body.parts,
      period: request.body.period,
    });
    replay.code(201).send(this.reportAdapter(report));
  }

  private reportAdapter({ id, period, parts }: FinancialPeriodModelComplete): any {
    return {
      id: String(id),
      period: {
        month: period.month,
        year: period.year,
        partCount: period.partCount,
      },
      parts: parts.map((p) => ({
        id: String(p.id),
        income: p.income,
        common: p.common,
        piggyBank: p.piggyBank,
        free: p.free,
      })),
    };
  }
}
