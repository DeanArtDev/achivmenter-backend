import { UniqID } from "../../types/common.types";
import { FinancialPartComplete } from "../financial-report/types";

export type CorrectionDTO = {
  name: string;
  amount: number;
};

export type CorrectionComplete = CorrectionDTO & { id: UniqID };

export type InputCreateCorrection = CorrectionDTO & { financialPartId: FinancialPartComplete["id"] };

export type InputUpdateCorrection = CorrectionComplete;

export type InputDeleteByFinancialPartIdCorrection = { financialPartId: FinancialPartComplete["id"] };

export type InputDeleteCorrection = { correctionId: CorrectionComplete["id"] };

export type InputSearchCorrection = {
  ids?: CorrectionComplete["id"][];
  financialPartId?: FinancialPartComplete["id"];
};