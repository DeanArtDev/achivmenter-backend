import FinancialReport from "../entity/financial-report.entity";
import { FinancialReportModelComplete, InputFinancialReportModel } from "../types";

export default interface IFinancialReportRepository {
  getAll(): Promise<FinancialReportModelComplete[]>;
  //todo: обновить
  create(report: FinancialReport): Promise<FinancialReportModelComplete>;
  update(report: Omit<InputFinancialReportModel, "parts">): Promise<FinancialReportModelComplete>;
  delete(id: FinancialReportModelComplete["id"]): Promise<boolean>;
}
