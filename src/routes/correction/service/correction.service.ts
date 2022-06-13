import { inject, injectable } from "inversify";
import ICorrectionRepository from "../../../repositories/interfaces/correctin.repository.interface";
import ICorrectionService from "./correction.service.interface";
import { dependenciesType } from "../../../dependencies.types";
import { CorrectionModel } from "@prisma/client";
import { InputCreateCorrection, InputCorrectionSearch } from "../types";

@injectable()
export default class CorrectionService implements ICorrectionService {
  constructor(
    @inject(dependenciesType.ICorrectionRepository)
    private readonly correctionRepository: ICorrectionRepository,
  ) {}

  public async create({ financialPartId, ...others }: InputCreateCorrection): Promise<CorrectionModel> {
    return await this.correctionRepository.create(others, financialPartId);
  }
  //
  // public async search(searchRequest: InputCorrectionSearch): Promise<CorrectionModel> {
  //   console.log("HERE");
  // }
}
