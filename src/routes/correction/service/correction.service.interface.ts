import { CorrectionModel } from "@prisma/client";
import { InputCreateCorrection, InputCorrectionSearch, InputUpdateCorrection, CorrectionComplete } from "../types";
import { FinancialPartComplete } from "../../financial-report/types";

export default interface ICorrectionService {
  create(correction: InputCreateCorrection): Promise<CorrectionModel | null>;
  update(correction: InputUpdateCorrection): Promise<CorrectionModel | null>;
  delete(correctionId: CorrectionComplete["id"]): Promise<boolean>;
  deleteCorrectionByFinancialPartId(financialPartId: FinancialPartComplete["id"]): Promise<boolean>;
  search(searchRequest: InputCorrectionSearch): Promise<CorrectionModel[]>;
}
