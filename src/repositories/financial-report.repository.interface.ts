import FinancialReport from "../entities/financial-report.entity";
import { FinancialReportModelComplete, InputFinancialReportModel } from "../routes/financial-report/types";

export default interface IFinancialReportRepository {
  getAll(): Promise<FinancialReportModelComplete[]>;
  create(report: FinancialReport): Promise<FinancialReportModelComplete>;
  update(report: Omit<InputFinancialReportModel, "parts">): Promise<FinancialReportModelComplete>;
  delete(id: FinancialReportModelComplete["id"]): Promise<boolean>;
}
