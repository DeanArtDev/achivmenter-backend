import { CorrectionModel, FinancialPartModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import ICorrectionRepository from "./interfaces/correctin.repository.interface";
import { ILogger } from "../logger";
import { IDataBaseService } from "../database";
import { InputCorrectionModel } from "../routes/financial-report/types";
import { dependenciesType } from "../dependencies.types";
import Correction from "../entities/correction.entity";

const isCorrection = (correction: CorrectionModel | null): correction is CorrectionModel => {
  if (!correction) return false;
  return "id" in correction;
};

@injectable()
export default class CorrectionRepository implements ICorrectionRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  public async create(correction: Correction, partId: FinancialPartModel["id"]): Promise<CorrectionModel> {
    return await this.db.client.correctionModel.create({ data: { financialPartId: partId, ...correction } });
  }

  public async createMany(corrections: Correction[], partId: FinancialPartModel["id"]): Promise<number> {
    const data = corrections.map((c) => ({ financialPartId: partId, ...c }));
    const response = await this.db.client.correctionModel.createMany({ data: data });
    return response.count;
  }

  public async delete(correctionId: CorrectionModel["id"]): Promise<boolean> {
    const deletedCorrection = await this.db.client.correctionModel.delete({ where: { id: correctionId } });
    return !!deletedCorrection;
  }

  public async update({ id, ...others }: InputCorrectionModel): Promise<CorrectionModel> {
    return await this.db.client.correctionModel.update({ where: { id: id }, data: others });
  }

  public async searchById(ids: CorrectionModel["id"][]): Promise<CorrectionModel[]> {
    const requests = ids.map((id) => this.db.client.correctionModel.findFirst({ where: { id } }));
    const result = await Promise.all(requests);
    return result.filter(isCorrection);
  }
}
