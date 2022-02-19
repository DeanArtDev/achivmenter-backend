import FinancialReport from "../entity/financial-report.entity";
import { FinancialReportModel } from ".prisma/client";

export default interface IFinancialReportRepository {
  create(report: FinancialReport): Promise<FinancialReportModel>;
  getAll(): Promise<FinancialReportModel[]>;
}
