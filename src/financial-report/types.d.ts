import { FinancialPartModel, FinancialPeriodModel, FinancialReportModel } from ".prisma/client";

export type FinancialPeriodModelComplete = FinancialReportModel & {
  period?: Omit<FinancialPeriodModel, "financialReportId", "id">;
  parts: Omit<FinancialPartModel, "financialReportId">[];
};
