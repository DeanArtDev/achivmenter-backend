import { UniqID } from "../../types/common.types";
import { FinancialPartComplete } from "./types";

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

export type FinancialReportResponseDTO = Omit<FinancialReportDTO, "parts"> & {
  id: UniqID;
  parts: FinancialPartComplete[];
};

export type FinancialPartCreateDTO = Omit<FinancialPartComplete, "id"> & { id?: UniqID };

export type FinancialReportCreateDTO = Omit<FinancialReportResponseDTO, "parts"> & {
  parts: FinancialPartCreateDTO[];
};
