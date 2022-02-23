import { FinancialPartModel, FinancialReportModel } from "@prisma/client";
import FinancialPart from "../entity/financial-part.entity";
import { InputFinancialPartModel, InputFinancialPartModelUpdate } from "../types";

export default interface IFinancialPartRepository {
  update(part: InputFinancialPartModel): Promise<FinancialPartModel>;
  updateOrCreate(
    part: InputFinancialPartModelUpdate,
    financialReportId: FinancialPartModel["financialReportId"],
  ): Promise<FinancialPartModel>;
  create(part: FinancialPart, financialReportId: FinancialReportModel["id"]): Promise<FinancialPartModel>;
  delete(id: FinancialPartModel["id"]): Promise<boolean>;
}
