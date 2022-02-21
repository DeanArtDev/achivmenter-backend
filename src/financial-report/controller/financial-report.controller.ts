import { inject, injectable } from "inversify";
import IFinancialReportController from "./financial-report.controller.interface";
import { ILogger } from "../../logger";
import { AppRoute } from "../../types/route.types";
import { IFinancialReportService } from "../service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialReportResponseDTO } from "../dto/financial-report.dto";
import { FinancialReportModelComplete } from "../types";
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
      url: this.url,
      // schema: validationSchemaOfCreate,
      method: "PUT",
      handler: this.onUpdateHandler.bind(this),
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
    this.ok<FinancialReportModelComplete[]>(replay, reports.map(this.reportAdapter));
  }

  private async onCreateHandler(
    request: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const report = await this.financialReportService.create({
      parts: request.body.parts,
      period: request.body.period,
    });
    this.create(replay).send(this.reportAdapter(report));
  }

  // todo: обязательно id при update
  private async onUpdateHandler(
    request: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const { id, parts, period } = request.body;
    const updatedReport = await this.financialReportService.update({ id, parts, period });
    this.ok<FinancialReportModelComplete>(replay, updatedReport);
  }

  private async onDeleteHandler(
    { params }: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply,
  ): Promise<void> {
    const isDeleted = await this.financialReportService.delete(params.id);
    this.ok<boolean>(replay, isDeleted);
  }

  private reportAdapter({ id, period: newPeriod, parts }: FinancialReportModelComplete): any {
    return {
      id: String(id),
      period: newPeriod
        ? {
            month: newPeriod.month,
            year: newPeriod.year,
            partCount: newPeriod.partCount,
          }
        : undefined,
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
