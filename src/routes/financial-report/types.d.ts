import { FinancialPartModel, FinancialReportModel } from "@prisma/client";
import { UniqID } from "../../types/common.types";
import { FinancialPartDTO } from "./financial-report.dto";

export type InputFinancialPartModel = Omit<FinancialPartModel, "financialReportId">;

export type FinancialReportModelComplete = FinancialReportModel & {
  parts: FinancialPartModel[];
};

export type FinancialPartComplete = FinancialPartDTO & { id: UniqID };

export type InputFinancialPartModelUpdate = Omit<InputFinancialPartModel, "id"> & { id?: number };

export type InputFinancialReportModel = Omit<FinancialReportModelComplete, "parts" | "createdAt"> & {
  parts: InputFinancialPartModelUpdate[];
};
