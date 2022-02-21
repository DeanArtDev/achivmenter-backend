import { FinancialPartModel, FinancialPeriodModel, FinancialReportModel } from "@prisma/client";

export type InputFinancialPartModel = Omit<FinancialPartModel, "financialReportId">;

export type FinancialReportModelComplete = FinancialReportModel & {
  period: FinancialPeriodModel | null;
  parts: FinancialPartModel[];
};

export type InputFinancialReportModel = Omit<FinancialReportModelComplete, "parts" | "createAt"> & {
  parts: InputFinancialPartModel[];
};
