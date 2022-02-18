export type FinancialPart = {
  id: UniqID;
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};

export type FinancialReport = {
  id: UniqID;
  period: FinancialPeriod;
  parts: FinancialPart[];
};

export type FinancialPeriod = {
  month: number;
  partCount: number;
};

export type FinancialPartDTOTypes = {
  id: Record<"type", string>;
  income: Record<"type", string>;
  common: Record<"type", string>;
  piggyBank: Record<"type", string>;
  free: Record<"type", string>;
};

export type FinancialPeriodDTOTypes = {
  month: Record<"type", string>;
  partCount: Record<"type", string>;
};
