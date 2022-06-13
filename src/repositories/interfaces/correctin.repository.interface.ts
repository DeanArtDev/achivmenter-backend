import { CorrectionModel, FinancialPartModel } from "@prisma/client";
import Correction from "../../entities/correction.entity";

export default interface ICorrectionRepository {
  create(correction: Correction, financialPartId: FinancialPartModel["id"]): Promise<CorrectionModel | null>;
  createMany(correction: Correction[], financialPartId: FinancialPartModel["id"]): Promise<number>;
  update(correction: Correction): Promise<CorrectionModel | null>;
  delete(correctionId: CorrectionModel["id"]): Promise<boolean>;
  searchByPartId(financialPartId: FinancialPartModel["id"]): Promise<CorrectionModel[]>;
  searchByIds(correctionIds: CorrectionModel["id"][]): Promise<CorrectionModel[]>;
}
