import { FinancialReportDTO } from '../dto/financial-report.dto';

export default interface IFinancialReportService {
    createReport(report: FinancialReportDTO): Promise<any>
}