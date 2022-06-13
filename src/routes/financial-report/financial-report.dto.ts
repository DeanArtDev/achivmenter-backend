import { UniqID } from "../../types/common.types";

export type FinancialReportDTO = {
  month: number;
  year: number;
  partCount: number;
  parts: FinancialPartDTO[];
};

export type FinancialPartDTO = {
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type CorrectionDTO = {
  name: string;
  amount: number;
};

export type CorrectionComplete = CorrectionDTO & { id: UniqID };

export type FinancialPartComplete = FinancialPartDTO & { id: UniqID };
export type FinancialReportResponseDTO = Omit<FinancialReportDTO, "parts"> & {
  id: UniqID;
  parts: FinancialPartComplete[];
};
export type FinancialPartCreateDTO = Omit<FinancialPartComplete, "id"> & { id?: UniqID };
export type FinancialReportCreateDTO = Omit<FinancialReportResponseDTO, "parts"> & {
  parts: FinancialPartCreateDTO[];
};
