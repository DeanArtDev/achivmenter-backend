import { injectable, inject } from "inversify";
import { dependenciesType } from "../../dependencies.types";
import { ILogger } from "../../logger";
import IFinancialReportRepository from "./financial-report.repository.interface";
import { IDataBaseService } from "../../database";
import { FinancialReportModelComplete, InputFinancialReportModel } from "../types";
import FinancialReport from "../entity/financial-report.entity";

@injectable()
export default class FinancialReportRepository implements IFinancialReportRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  public async getAll(): Promise<FinancialReportModelComplete[]> {
    return await this.db.client.financialReportModel.findMany({
      include: { parts: true, period: true },
    });
  }

  public async create(report: FinancialReport): Promise<FinancialReportModelComplete> {
    return await this.db.client.financialReportModel.create({
      data: { parts: { create: report.parts }, period: { create: report.period } },
      include: { parts: true, period: true },
    });
  }

  /*todo:
  1. разнести модели по отдельным репозиториях (для каждого своя)
  2. в репозитории не делать мульти запросов это делать в service
  * */
  public async update(report: InputFinancialReportModel): Promise<any> {
    this.db.client.financialReportModel.update({
      where: { id: report.id },
      data: {
        parts: {
          connectOrCreate: {
            where: { id: report.parts[0].id },
            create: {
              income: report.parts[0].income,
              common: report.parts[0].common,
              piggyBank: report.parts[0].piggyBank,
              free: report.parts[0].free,
            },
          },
        },
      },
    });
  }

  //todo: убедиться что удаляются все сущьности
  public async delete(id: string): Promise<boolean> {
    try {
      return !!(await this.db.client.financialReportModel.delete({
        where: { id: Number(id) },
      }));
    } catch (e: any) {
      //todo: [ErrorService]
      this.loggerService.error(`[FinancialReportRepository DELETE] ID: ${id} ${e.meta.cause}`);
      return false;
    }
  }
}
