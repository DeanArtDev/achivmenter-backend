import { CorrectionModel } from "@prisma/client";
import { UniqID } from "../../types/common.types";

export type InputCorrectionSearch = {
  ids: CorrectionModel["id"][];
};

export type InputCorrectionModel = Omit<CorrectionModel, "createAt">;

export type InputCreateCorrection = CorrectionDTO & { financialPartId: CorrectionModel["financialPartId"]};

export type CorrectionDTO = {
  name: string;
  amount: number;
};

export type CorrectionComplete = CorrectionDTO & { id: UniqID };
