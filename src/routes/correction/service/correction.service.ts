import { inject, injectable } from "inversify";
import { CorrectionModel } from "@prisma/client";
import ICorrectionRepository from "../../../repositories/interfaces/correctin.repository.interface";
import ICorrectionService from "./correction.service.interface";
import { InputCreateCorrection, InputSearchCorrection, InputUpdateCorrection, CorrectionWithId } from "../types";
import { FinancialPartComplete } from "../../financial-report/types";
import Correction from "../../../entities/correction.entity";
import { dependenciesType } from "../../../dependencies.types";

@injectable()
export default class CorrectionService implements ICorrectionService {
  constructor(
    @inject(dependenciesType.ICorrectionRepository)
    private readonly correctionRepository: ICorrectionRepository,
  ) {}

  public async create({ financialPartId, name, amount, type }: InputCreateCorrection): Promise<CorrectionModel | null> {
    return await this.correctionRepository.create(new Correction(name, amount, type), Number(financialPartId));
  }

  public async update(correction: InputUpdateCorrection): Promise<CorrectionModel | null> {
    if (!(await this.isCorrectionExisted(Number(correction.id)))) return null;
    return await this.correctionRepository.update(correction);
  }

  public async delete(correctionId: CorrectionWithId["id"]): Promise<boolean> {
    if (!(await this.isCorrectionExisted(Number(correctionId)))) return false;
    return await this.correctionRepository.delete(Number(correctionId));
  }

  public async deleteCorrectionByFinancialPartId(financialPartId: FinancialPartComplete["id"]): Promise<boolean> {
    return await this.correctionRepository.deleteByFinancialPartId(Number(financialPartId));
  }

  public async search(searchRequest: InputSearchCorrection): Promise<CorrectionModel[]> {
    if (searchRequest.financialPartId) {
      return await this.correctionRepository.searchByPartId(Number(searchRequest.financialPartId));
    }

    if (searchRequest.ids && searchRequest.ids?.length > 0) {
      return await this.correctionRepository.searchByIds(searchRequest.ids.map(Number));
    }
    return [];
  }

  private async isCorrectionExisted(correctionId: CorrectionModel["id"]): Promise<boolean> {
    return !!(await this.correctionRepository.searchByIds([correctionId]));
  }
}
