import { CorrectionModel, FinancialPartModel } from "@prisma/client";
import Correction from "../../entities/correction.entity";

export default interface ICorrectionRepository {
  searchById(ids: CorrectionModel["id"][]): Promise<CorrectionModel[]>;
  create(correction: Correction, partId: FinancialPartModel["id"]): Promise<CorrectionModel>;
  createMany(correction: Correction[], partId: FinancialPartModel["id"]): Promise<number>;
  update(correction: Correction, partId: FinancialPartModel["id"]): Promise<CorrectionModel>;
  delete(correctionId: CorrectionModel["id"]): Promise<boolean>;
}
