import { FinancialPartModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import FinancialPart from "../entity/financial-part.entity";
import IFinancialPartRepository from "./financial-part.repository.interface";
import { InputFinancialPartModel } from "../types";
import { ILogger } from "../../logger";
import { IDataBaseService } from "../../database";
import { dependenciesType } from "../../dependencies.types";
import "reflect-metadata";

@injectable()
export default class FinancialPartRepository implements IFinancialPartRepository {
  constructor(
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
  ) {}

  // public async getOne(id: FinancialPartModel["id"]): Promise<FinancialPartModel | null> {}

  public async create(part: FinancialPart, financialReportId: number): Promise<FinancialPartModel> {
    return await this.db.client.financialPartModel.create({
      data: { income: part.income, common: part.common, piggyBank: part.piggyBank, free: part.free, financialReportId },
    });
  }

  public async update(part: InputFinancialPartModel): Promise<FinancialPartModel> {
    return await this.db.client.financialPartModel.update({
      where: { id: part.id },
      data: { income: part.income, common: part.common, piggyBank: part.piggyBank, free: part.free },
    });
  }

  public async delete(id: FinancialPartModel["id"]): Promise<boolean> {
    return !!(await this.db.client.financialPartModel.delete({ where: { id: id } }));
  }
}
