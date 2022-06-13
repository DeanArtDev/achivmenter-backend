import { CorrectionModel } from "@prisma/client";
import { InputCreateCorrection, InputCorrectionSearch, InputUpdateCorrection } from "../types";

export default interface ICorrectionService {
  create(correction: InputCreateCorrection): Promise<CorrectionModel | null>;
  update(correction: InputUpdateCorrection): Promise<CorrectionModel | null>;
  search(searchRequest: InputCorrectionSearch): Promise<CorrectionModel[]>;
}
