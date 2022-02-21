import { inject, injectable } from "inversify";
import IFinancialReportService from "./financial-report.service.interface";
import {
  FinancialPartCreateDTO,
  FinancialReportCreateDTO,
  FinancialReportDTO,
  FinancialReportResponseDTO,
} from "../dto/financial-report.dto";
import FinancialReport from "../entity/financial-report.entity";
import { dependenciesType } from "../../dependencies.types";
import { IFinancialPartRepository, IFinancialReportRepository } from "../repository";
import { FinancialReportModelComplete, InputFinancialPartModel } from "../types";
import "reflect-metadata";
import FinancialPart from "../entity/financial-part.entity";

@injectable()
export default class FinancialReportService implements IFinancialReportService {
  constructor(
    @inject(dependenciesType.IFinancialReportRepository) private financialReportRepository: IFinancialReportRepository,
    @inject(dependenciesType.IFinancialPartRepository) private financialPartRepository: IFinancialPartRepository,
  ) {}

  public async getAll(): Promise<FinancialReportModelComplete[]> {
    return await this.financialReportRepository.getAll();
  }

  public async create(report: FinancialReportDTO): Promise<FinancialReportModelComplete> {
    const newReport = new FinancialReport(report.period, report.parts);
    return await this.financialReportRepository.create(newReport);
  }

  public async update(report: FinancialReportCreateDTO): Promise<any> {
    const requests = report.parts.reduce<Promise<any>[]>((acc, part) => {
      if (part.id) {
        this.financialPartRepository.update(this.partAdapter(part));
      }
      acc.push(
        this.financialPartRepository.create(
          new FinancialPart(part.income, part.common, part.piggyBank, part.free),
          Number(report.id),
        ),
      );
      return acc;
    }, []);
    const response = await Promise.all(requests);
    return await this.financialReportRepository.update(report);
  }

  public async delete(id: string): Promise<boolean> {
    return this.financialReportRepository.delete(id);
  }

  private partAdapter(part: FinancialPartCreateDTO): InputFinancialPartModel {
    return {
      id: Number(part.id),
      income: part.income,
      common: part.common,
      piggyBank: part.piggyBank,
      free: part.free,
    };
  }
}
