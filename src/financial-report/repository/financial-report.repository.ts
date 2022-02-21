import { injectable, inject } from "inversify";
import { ILogger } from "../../logger";
import IFinancialReportRepository from "./financial-report.repository.interface";
import { IDataBaseService } from "../../database";
import { FinancialReportModelComplete, InputFinancialReportModel } from "../types";
import { dependenciesType } from "../../dependencies.types";
import FinancialReport from "../entity/financial-report.entity";

@injectable()
export default class FinancialReportRepository implements IFinancialReportRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  public async getAll(): Promise<FinancialReportModelComplete[]> {
    return await this.db.client.financialReportModel.findMany({ include: { parts: true } });
  }

  public async create({ parts, ...others }: FinancialReport): Promise<FinancialReportModelComplete> {
    return await this.db.client.financialReportModel.create({
      data: { parts: { create: parts }, ...others },
      include: { parts: true },
    });
  }

  public async update({
    id,
    month,
    year,
    partCount,
  }: Omit<InputFinancialReportModel, "parts">): Promise<FinancialReportModelComplete> {
    return await this.db.client.financialReportModel.update({
      where: { id },
      include: { parts: true },
      data: { month, year, partCount },
    });
  }

  public async delete(id: FinancialReportModelComplete["id"]): Promise<boolean> {
    return !!(await this.db.client.financialReportModel.delete({ where: { id } }));
  }
}
