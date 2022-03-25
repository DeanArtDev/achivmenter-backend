import { FinancialPartModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import FinancialPart from "../entity/financial-part.entity";
import IFinancialPartRepository from "./financial-part.repository.interface";
import { InputFinancialPartModel, InputFinancialPartModelUpdate } from "../types";
import { ILogger } from "../../../logger";
import { IDataBaseService } from "../../../database";
import { dependenciesType } from "../../../dependencies.types";
import "reflect-metadata";

@injectable()
export default class FinancialPartRepository implements IFinancialPartRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}


  public async create(part: FinancialPart, financialReportId: number): Promise<FinancialPartModel> {
    return await this.db.client.financialPartModel.create({
      data: { financialReportId, ...part },
    });
  }

  public async updateOrCreate(
    { id, ...others }: InputFinancialPartModelUpdate,
    financialReportId: FinancialPartModel["financialReportId"],
  ): Promise<FinancialPartModel> {
    return await this.db.client.financialPartModel.upsert({
      where: { id: id ?? 0 },
      update: others,
      create: { ...others, financialReportId },
    });
  }

  public async update({ id, ...others }: InputFinancialPartModel): Promise<FinancialPartModel> {
    return await this.db.client.financialPartModel.update({
      where: { id },
      data: others,
    });
  }

  public async delete(id: FinancialPartModel["id"]): Promise<boolean> {
    const deletedPart = await this.db.client.financialPartModel.delete({ where: { id: id } });
    return !!deletedPart;
  }
}
