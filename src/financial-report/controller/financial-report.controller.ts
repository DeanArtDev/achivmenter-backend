import { inject, injectable } from "inversify";
import IFinancialReportController from "./financial-report.controller.interface";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";
import { IFinancialReportService } from "../service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialReportResponseDTO } from "../dto/financial-report.dto";
import { FinancialPeriodModelComplete } from "../types";
import { dependenciesType } from "../../dependencies.types";
import { validationSchemaOfCreate, validationSchemaOfGetAll } from "../financial-report.validation.schema";
import { BaseController } from "../../common/base.controller";
import "reflect-metadata";

@injectable()
export default class FinancialReportController extends BaseController implements IFinancialReportController {
  private readonly url = "/financial-report";

  public routes: AppRoute[] = [
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
    {
      url: this.url + "/:id",
      // schema: validationSchemaOfDelete,
      method: "DELETE",
      handler: this.onDeleteHandler.bind(this),
    },
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IFinancialReportService)
    private readonly financialReportService: IFinancialReportService,
  ) {
    super(loggerService);
  }

  private async onGetAllHandler(_: FastifyRequest, replay: FastifyReply): Promise<void> {
    const reports = await this.financialReportService.getAll();
    this.ok<FinancialPeriodModelComplete[]>(replay, reports.map(this.reportAdapter));
  }

  private async onCreateHandler(
    request: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const report = await this.financialReportService.createReport({
      parts: request.body.parts,
      period: request.body.period,
    });
    this.create(replay).send(this.reportAdapter(report));
  }

  private async onDeleteHandler(
    { params }: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply,
  ): Promise<void> {
    const isDeleted = await this.financialReportService.deleteReport(params.id);
    this.ok<boolean>(replay, isDeleted);
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
