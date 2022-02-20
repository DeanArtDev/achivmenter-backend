import FinancialReport from "../entity/financial-report.entity";
import { FinancialPeriodModelComplete } from "../types";

export default interface IFinancialReportRepository {
  getAll(): Promise<FinancialPeriodModelComplete[]>;
  create(report: FinancialReport): Promise<FinancialPeriodModelComplete>;
  delete(id: string): Promise<boolean>;
}
