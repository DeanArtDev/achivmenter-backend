import { injectable, inject } from "inversify";
import { dependenciesType } from "../../dependencies.types";
import { ILogger } from "../../logger";
import IFinancialReportRepository from "./financial-report.repository.interface";
import { IDataBaseService } from "../../database";
import FinancialReport from "../entity/financial-report.entity";
import { FinancialPeriodModelComplete } from "../types";

@injectable()
export default class FinancialReportRepository implements IFinancialReportRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly logger: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  public async create(report: FinancialReport): Promise<FinancialPeriodModelComplete> {
    return await this.db.client.financialReportModel.create({
      data: { parts: { create: report.parts }, period: { create: report.period } },
      include: { parts: true, period: true },
    });
  }

  public async getAll(): Promise<FinancialPeriodModelComplete[]> {
    return await this.db.client.financialReportModel.findMany({
      include: { parts: true, period: true },
    });
  }
}
