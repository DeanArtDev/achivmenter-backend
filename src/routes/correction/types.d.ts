import { CorrectionModel, FinancialPartModel } from "@prisma/client";
import { UniqID } from "../../types/common.types";

export type InputCorrectionSearch = {
  ids?: CorrectionModel["id"][];
  financialPartId?: FinancialPartModel["id"];
};

export type CorrectionDTO = {
  name: string;
  amount: number;
};

export type CorrectionComplete = CorrectionDTO & { id: UniqID };

export type InputCreateCorrection = CorrectionDTO & { financialPartId: FinancialPartModel["id"] };

export type InputUpdateCorrection = CorrectionComplete;
