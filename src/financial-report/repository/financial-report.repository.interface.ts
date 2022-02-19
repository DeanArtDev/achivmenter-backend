import FinancialReport from "../entity/financial-report.entity";
import { FinancialPeriodModelComplete } from "../types";

export default interface IFinancialReportRepository {
  create(report: FinancialReport): Promise<FinancialPeriodModelComplete>;
  getAll(): Promise<FinancialPeriodModelComplete[]>;
}
