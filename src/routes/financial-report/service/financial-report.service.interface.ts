import { FinancialReportDTO, FinancialReportResponseDTO } from "../financial-report.dto";
import { FinancialReportModelComplete } from "../types";

export default interface IFinancialReportService {
  getAll(): Promise<FinancialReportModelComplete[]>;
  create(report: FinancialReportDTO): Promise<FinancialReportModelComplete>;
  update(report: FinancialReportResponseDTO): Promise<FinancialReportModelComplete>;
  delete(id: string): Promise<boolean>;
}
