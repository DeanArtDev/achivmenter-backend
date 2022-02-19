import { UniqID } from "../../types/common.types";

export type FinancialReportDTO = {
  period: FinancialPeriodDTO;
  parts: FinancialPartDTO[];
};
export type FinancialPeriodDTO = {
  month: number;
  year: number;
  partCount: number;
};
export type FinancialPartDTO = {
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type FinancialResponseDTO = FinancialReportDTO & {
  id: UniqID;
  parts: FinancialPartDTO & { id: UniqID };
};
