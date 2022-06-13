import { CorrectionModel } from "@prisma/client";
import { InputCreateCorrection, InputCorrectionSearch } from "../types";

export default interface ICorrectionService {
  create(correction: InputCreateCorrection): Promise<CorrectionModel>;
  // search(searchRequest: InputCorrectionSearch): Promise<CorrectionModel>;
}
