import { FinancialReportDTO } from "../dto/financial-report.dto";
import { FinancialReportModel } from ".prisma/client";

export default interface IFinancialReportService {
  createReport(report: FinancialReportDTO): Promise<FinancialReportModel>;
  getAll(): Promise<FinancialReportModel[]>;
}
