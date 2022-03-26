import { FinancialPartModel, FinancialReportModel } from "@prisma/client";
import FinancialPart from "../../entities/financial-part.entity";
import { InputFinancialPartModel, InputFinancialPartModelUpdate } from "../../routes/financial-report/types";

export default interface IFinancialPartRepository {
  update(part: InputFinancialPartModel): Promise<FinancialPartModel>;
  updateOrCreate(
    part: InputFinancialPartModelUpdate,
    financialReportId: FinancialPartModel["financialReportId"],
  ): Promise<FinancialPartModel>;
  create(part: FinancialPart, financialReportId: FinancialReportModel["id"]): Promise<FinancialPartModel>;
  delete(id: FinancialPartModel["id"]): Promise<boolean>;
}
