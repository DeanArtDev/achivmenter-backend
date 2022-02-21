import { FinancialReportDTO, FinancialReportResponseDTO } from "../dto/financial-report.dto";
import { FinancialReportModelComplete } from "../types";

export default interface IFinancialReportService {
  getAll(): Promise<FinancialReportModelComplete[]>;
  create(report: FinancialReportDTO): Promise<FinancialReportModelComplete>;
  update(report: FinancialReportResponseDTO): Promise<any>;
  delete(id: string): Promise<boolean>;
}
