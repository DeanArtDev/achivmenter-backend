import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { inject, injectable } from "inversify";
import IFinancialReportController from "./financial-report.controller.interface";
import { ILogger } from "../../../logger";
import { AppRoute } from "../../../types/route.types";
import { IFinancialReportService } from "../service";
import { FastifyReply, FastifyRequest } from "fastify";
import { FinancialReportResponseDTO } from "../financial-report.dto";
import { FinancialReportModelComplete } from "../types";
import { dependenciesType } from "../../../dependencies.types";
import {
  validationSchemaCreate,
  validationSchemaDelete,
  validationSchemaGetAll,
} from "../financial-report.validation.schema";
import { BaseController } from "../../../common/base-controller";
import { HTTPError, IExceptionFilter } from "../../../error";
import { AuthGuardMiddleware } from "../../../middlewares";

@injectable()
export default class FinancialReportController extends BaseController implements IFinancialReportController {
  private readonly url = "/financial-report";

  public routes: AppRoute[] = [
    {
      url: this.url,
      method: "GET",
      schema: validationSchemaGetAll,
      handler: this.onGetAllFinancialReport.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
    },
    {
      url: this.url,
      schema: validationSchemaCreate,
      method: "POST",
      handler: this.onCreateFinancialReport.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
    },
    {
      url: this.url,
      schema: validationSchemaCreate,
      method: "PUT",
      handler: this.onUpdateFinancialReport.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
    },
    {
      url: this.url + "/:id",
      schema: validationSchemaDelete,
      method: "DELETE",
      handler: this.onDeleteFinancialReport.bind(this),
      onRequest: [new AuthGuardMiddleware().execute],
    },
  ];

  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IFinancialReportService) private readonly financialReportService: IFinancialReportService,
    @inject(dependenciesType.IExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
  ) {
    super(loggerService);
  }

  private async onGetAllFinancialReport(_: FastifyRequest, replay: FastifyReply): Promise<void> {
    const reports = await this.financialReportService.getAll();
    this.ok<FinancialReportResponseDTO[]>(replay, reports.map(this.reportResponseAdapter));
  }

  private async onCreateFinancialReport(
    { body }: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    const { month, year, partCount, parts } = body;
    const report = await this.financialReportService.create({ month, year, partCount, parts });
    this.create<FinancialReportResponseDTO>(replay, this.reportResponseAdapter(report));
  }

  private async onUpdateFinancialReport(
    request: FastifyRequest<{ Body: FinancialReportResponseDTO }>,
    replay: FastifyReply,
  ): Promise<void> {
    try {
      const { id, month, year, partCount, parts } = request.body;
      const updatedReport = await this.financialReportService.update({ id, month, year, partCount, parts });
      this.ok<FinancialReportResponseDTO>(replay, this.reportResponseAdapter(updatedReport));
    } catch (e) {
      // todo: [error] если не HTTPError то оборачиваем в HTTPError, в остальных случаях пропускаем дальше
      if (e instanceof PrismaClientKnownRequestError) {
        this.exceptionFilter.catch(
          new HTTPError(500, JSON.stringify(e.meta, null, 2), `[FinancialReportController]`),
          request,
          replay,
        );
      }
    }
  }

  private async onDeleteFinancialReport(
    { params }: FastifyRequest<{ Params: { id: string } }>,
    replay: FastifyReply,
  ): Promise<void> {
    const isDeleted = await this.financialReportService.delete(params.id);
    this.ok<boolean>(replay, isDeleted);
  }

  private reportResponseAdapter({
    id,
    parts,
    month,
    year,
    partCount,
  }: FinancialReportModelComplete): FinancialReportResponseDTO {
    return {
      id: String(id),
      month,
      year,
      partCount,
      parts: parts.map(({ id, income, common, piggyBank, free }) => ({
        id: String(id),
        income,
        common,
        piggyBank,
        free,
      })),
    };
  }
}
