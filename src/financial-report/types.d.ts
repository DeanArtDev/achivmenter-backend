import { FinancialPartModel, FinancialReportModel } from "@prisma/client";

export type InputFinancialPartModel = Omit<FinancialPartModel, "financialReportId">;

export type FinancialReportModelComplete = FinancialReportModel & {
  parts: FinancialPartModel[];
};

export type InputFinancialPartModelCreate = Omit<InputFinancialPartModel, "id"> & { id?: number };
export type InputFinancialReportModel = Omit<FinancialReportModelComplete, "parts" | "createdAt"> & {
  parts: InputFinancialPartModelCreate[];
};
