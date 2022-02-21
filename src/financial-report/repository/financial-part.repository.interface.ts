import { FinancialPartModel, FinancialReportModel } from "@prisma/client";
import FinancialPart from "../entity/financial-part.entity";
import { InputFinancialPartModel } from "../types";

export default interface IFinancialPartRepository {
  // getOne(id: FinancialPartModel["id"]): Promise<FinancialPartModel | null>;
  update(part: InputFinancialPartModel): Promise<FinancialPartModel>;
  create(part: FinancialPart, financialReportId: FinancialReportModel["id"]): Promise<FinancialPartModel>;
  delete(id: FinancialPartModel["id"]): Promise<boolean>;
}
