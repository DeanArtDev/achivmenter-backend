export type FinancialReportDTO = {
  period: FinancialPeriodDTO;
  parts: FinancialPartDTO[];
};
export type FinancialPeriodDTO = {
  month: number;
  partCount: number;
};
export type FinancialPartDTO = {
  income: number;
  common: number;
  piggyBank: number;
  free: number;
};
