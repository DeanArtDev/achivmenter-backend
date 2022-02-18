import { inject, injectable } from "inversify";
import IFinancialReportService from "./financial-report.service.interface";
import { FinancialReportDTO } from "../dto/financial-report.dto";
import FinancialReport from "../entity/financial-report.entity";
import "reflect-metadata";
import { dependenciesType } from "../../dependencies.types";

@injectable()
export default class FinancialReportService implements IFinancialReportService {
  constructor(
    @inject(dependenciesType.IFinancialReportRepository) private financialReportRepository: IFinancialReportRepository,
  ) {}

  public createReport(report: FinancialReportDTO): Promise<any> {
    const newReport = new FinancialReport(report.period, report.parts);

    return;
  }
}
