import { inject, injectable } from "inversify";
import { CorrectionModel } from "@prisma/client";
import ICorrectionRepository from "../../../repositories/interfaces/correctin.repository.interface";
import ICorrectionService from "./correction.service.interface";
import { InputCreateCorrection, InputCorrectionSearch, InputUpdateCorrection, CorrectionComplete } from "../types";
import { FinancialPartComplete } from "../../financial-report/types";
import { dependenciesType } from "../../../dependencies.types";

@injectable()
export default class CorrectionService implements ICorrectionService {
  constructor(
    @inject(dependenciesType.ICorrectionRepository)
    private readonly correctionRepository: ICorrectionRepository,
  ) {}

  public async create({ financialPartId, ...others }: InputCreateCorrection): Promise<CorrectionModel | null> {
    return await this.correctionRepository.create(others, financialPartId);
  }

  public async update(correction: InputUpdateCorrection): Promise<CorrectionModel | null> {
    return await this.correctionRepository.update(correction);
  }

  public async delete(correctionId: CorrectionComplete["id"]): Promise<boolean> {
    return await this.correctionRepository.delete(Number(correctionId));
  }

  public async deleteCorrectionByFinancialPartId(financialPartId: FinancialPartComplete["id"]): Promise<boolean> {
    return await this.correctionRepository.deleteByFinancialPartId(Number(financialPartId));
  }

  public async search(searchRequest: InputCorrectionSearch): Promise<CorrectionModel[]> {
    if (searchRequest.financialPartId) {
      return await this.correctionRepository.searchByPartId(searchRequest.financialPartId);
    }

    if (searchRequest.ids && searchRequest.ids?.length > 0) {
      return await this.correctionRepository.searchByIds(searchRequest.ids);
    }
    return [];
  }
}
