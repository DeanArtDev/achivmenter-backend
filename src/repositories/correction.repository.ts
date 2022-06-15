import { CorrectionModel, FinancialPartModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import ICorrectionRepository from "./interfaces/correctin.repository.interface";
import { ILogger } from "../logger";
import { IDataBaseService } from "../database";
import { InputUpdateCorrection } from "../routes/correction/types";
import Correction from "../entities/correction.entity";
import { dependenciesType } from "../dependencies.types";

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

  public async create(
    correction: Correction,
    financialPartId: FinancialPartModel["id"],
  ): Promise<CorrectionModel | null> {
    return await this.db.client.correctionModel.create({ data: { ...correction, financialPartId } });
  }

  public async createMany(corrections: Correction[], financialPartId: FinancialPartModel["id"]): Promise<number> {
    const data = corrections.map((c) => ({ ...c, financialPartId }));
    const response = await this.db.client.correctionModel.createMany({ data: data });
    return response.count;
  }

  public async delete(correctionId: CorrectionModel["id"]): Promise<boolean> {
    const deletedCorrection = await this.db.client.correctionModel.delete({ where: { id: correctionId } });
    return !!deletedCorrection;
  }

  public async deleteByFinancialPartId(financialPartId: FinancialPartModel["id"]): Promise<boolean> {
    const deletedResponse = await this.db.client.correctionModel.deleteMany({ where: { financialPartId } });
    return deletedResponse.count > 0;
  }

  public async update({ id, ...others }: InputUpdateCorrection): Promise<CorrectionModel | null> {
    return await this.db.client.correctionModel.update({ where: { id: Number(id) }, data: others });
  }

  public async searchByPartId(financialPartId: FinancialPartModel["id"]): Promise<CorrectionModel[]> {
    return await this.db.client.correctionModel.findMany({ where: { financialPartId } });
  }

  public async searchByIds(correctionIds: CorrectionModel["id"][]): Promise<CorrectionModel[]> {
    const requests = correctionIds.map((id) => this.db.client.correctionModel.findFirst({ where: { id } }));
    const searchResult = await Promise.all(requests);
    return searchResult.filter(isCorrection);
  }
}
