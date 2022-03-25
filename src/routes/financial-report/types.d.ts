import { FinancialPartModel, FinancialReportModel } from "@prisma/client";

export type InputFinancialPartModel = Omit<FinancialPartModel, "financialReportId">;

export type FinancialReportModelComplete = FinancialReportModel & {
  parts: FinancialPartModel[];
};

export type InputFinancialPartModelUpdate = Omit<InputFinancialPartModel, "id"> & { id?: number };
export type InputFinancialReportModel = Omit<FinancialReportModelComplete, "parts" | "createdAt"> & {
  parts: InputFinancialPartModelUpdate[];
};
