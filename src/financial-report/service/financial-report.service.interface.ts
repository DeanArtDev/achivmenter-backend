import { FinancialReportDTO } from "../dto/financial-report.dto";
import { FinancialPeriodModelComplete } from "../types";

export default interface IFinancialReportService {
  getAll(): Promise<FinancialPeriodModelComplete[]>;
  createReport(report: FinancialReportDTO): Promise<FinancialPeriodModelComplete>;
  deleteReport(id: string): Promise<boolean>;
}
