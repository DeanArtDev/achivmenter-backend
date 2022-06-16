import { UniqID } from "../../types/common.types";
import { FinancialPartComplete } from "../financial-report/types";

export type CorrectionDTO = {
  name: string;
  amount: number;
};

export type CorrectionWithId = CorrectionDTO & { id: UniqID };

export type InputCreateCorrection = CorrectionDTO & { financialPartId: FinancialPartComplete["id"] };

export type InputUpdateCorrection = CorrectionWithId;

export type InputDeleteByFinancialPartIdCorrection = { financialPartId: FinancialPartComplete["id"] };

export type InputDeleteCorrection = { correctionId: CorrectionWithId["id"] };

export type InputSearchCorrection = {
  ids?: CorrectionWithId["id"][];
  financialPartId?: FinancialPartComplete["id"];
};