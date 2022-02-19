import { FinancialReportDTO } from "../dto/financial-report.dto";
import { FinancialPeriodModelComplete } from "../types";

export default interface IFinancialReportService {
  createReport(report: FinancialReportDTO): Promise<FinancialPeriodModelComplete>;
  getAll(): Promise<FinancialPeriodModelComplete[]>;
}
