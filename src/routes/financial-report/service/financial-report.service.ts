import { inject, injectable } from "inversify";
import { difference } from "lodash";
import { FinancialPartModel, FinancialReportModel } from "@prisma/client";
import IFinancialReportRepository from "../../../repositories/interfaces/financial-report.repository.interface";
import IFinancialPartRepository from "../../../repositories/interfaces/financial-part.repository.interface";
import IFinancialReportService from "./financial-report.service.interface";
import { FinancialPartCreateDTO, FinancialReportCreateDTO, FinancialReportDTO } from "../financial-report.dto";
import { FinancialReportModelComplete } from "../types";
import ICorrectionRepository from "../../../repositories/interfaces/correctin.repository.interface";
import FinancialReport from "../../../entities/financial-report.entity";
import { dependenciesType } from "../../../dependencies.types";

@injectable()
export default class FinancialReportService implements IFinancialReportService {
  constructor(
    @inject(dependenciesType.IFinancialReportRepository)
    private readonly financialReportRepository: IFinancialReportRepository,
    @inject(dependenciesType.IFinancialPartRepository)
    private readonly financialPartRepository: IFinancialPartRepository,
    @inject(dependenciesType.ICorrectionRepository)
    private readonly correctionRepository: ICorrectionRepository,
  ) {}

  public async getAll(): Promise<FinancialReportModelComplete[]> {
    return await this.financialReportRepository.getAll();
  }

  public async create(report: FinancialReportDTO): Promise<FinancialReportModelComplete> {
    const newReport = new FinancialReport(report.month, report.year, report.partCount, report.parts);
    return await this.financialReportRepository.create(newReport);
  }

  public async update({
    id: reportId,
    parts,
    ...others
  }: FinancialReportCreateDTO): Promise<FinancialReportModelComplete> {
    const updatedReport = await this.financialReportRepository.update({ id: Number(reportId), ...others });

    const partsForUpdate = parts.filter((p) => !isNaN(Number(p.id)));
    const partIdsForDelete = difference(
      updatedReport.parts.map((i) => i.id),
      partsForUpdate.map((i) => Number(i.id)),
    );
    partIdsForDelete.length > 0 && (await this.deleteUnusedParts(partIdsForDelete));

    const newParts = await this.createOrUpdateParts(parts, Number(reportId));
    return { ...updatedReport, parts: newParts };
  }

  public async delete(id: string): Promise<boolean> {
    return this.financialReportRepository.delete(Number(id));
  }

  private async deleteUnusedParts(ids: number[]): Promise<void> {
    const requests = ids.reduce<Promise<boolean>[]>((acc, id) => {
      acc.push(this.financialPartRepository.delete(Number(id)));
      return acc;
    }, []);
    await Promise.all(requests);
  }

  private async createOrUpdateParts(parts: FinancialPartCreateDTO[], reportId: FinancialReportModel["id"]) {
    const requests = parts.map<Promise<FinancialPartModel>>(({ id: partId, ...others }) => {
      const id = isNaN(Number(partId)) ? undefined : Number(partId);
      //todo: добавить обработку ошибок, если приходит id (isNaN) молча не сохраняет.
      return this.financialPartRepository.updateOrCreate({ id, ...others }, reportId);
    });

    return await Promise.all(requests);
  }
}
