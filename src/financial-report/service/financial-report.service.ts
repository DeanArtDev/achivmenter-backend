import { inject, injectable } from "inversify";
import IFinancialReportService from "./financial-report.service.interface";
import { FinancialReportDTO } from "../dto/financial-report.dto";
import FinancialReport from "../entity/financial-report.entity";
import { dependenciesType } from "../../dependencies.types";
import { IFinancialReportRepository } from "../repository";
import { FinancialPeriodModelComplete } from "../types";
import "reflect-metadata";

@injectable()
export default class FinancialReportService implements IFinancialReportService {
  constructor(
    @inject(dependenciesType.IFinancialReportRepository) private financialReportRepository: IFinancialReportRepository,
  ) {}

  public async getAll(): Promise<FinancialPeriodModelComplete[]> {
    return await this.financialReportRepository.getAll();
  }

  public async createReport(report: FinancialReportDTO): Promise<FinancialPeriodModelComplete> {
    const newReport = new FinancialReport(report.period, report.parts);
    return await this.financialReportRepository.create(newReport);
  }

  public async deleteReport(id: string): Promise<boolean> {
    return this.financialReportRepository.delete(id);
  }
}
