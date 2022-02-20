import { injectable, inject } from "inversify";
import { dependenciesType } from "../../dependencies.types";
import { ILogger } from "../../logger";
import IFinancialReportRepository from "./financial-report.repository.interface";
import { IDataBaseService } from "../../database";
import { FinancialPeriodModelComplete } from "../types";
import FinancialReport from "../entity/financial-report.entity";

@injectable()
export default class FinancialReportRepository implements IFinancialReportRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  public async getAll(): Promise<FinancialPeriodModelComplete[]> {
    return await this.db.client.financialReportModel.findMany({
      include: { parts: true, period: true },
    });
  }

  public async create(report: FinancialReport): Promise<FinancialPeriodModelComplete> {
    return await this.db.client.financialReportModel.create({
      data: { parts: { create: report.parts }, period: { create: report.period } },
      include: { parts: true, period: true },
    });
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const response = await this.db.client.financialReportModel.delete({
        where: { id: Number(id) },
      });
      return response.id === Number(id);
    } catch (e: any) {
      //todo: [ErrorService]
      this.loggerService.error(`[FinancialReportRepository DELETE] ${e.meta.cause}`);
      return false;
    }
  }
}
