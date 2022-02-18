import { FinancialPartDTOTypes, FinancialPeriodDTOTypes } from "../types";

const FinancialPart = {
  id: { type: "string" },
  income: { type: "number" },
  common: { type: "number" },
  piggyBank: { type: "number" },
  free: { type: "number" },
};

const FinancialPeriod = {
  month: { type: "number" },
  partCount: { type: "number" },
};

export const FinancialPeriodResponseDTO = {
  type: "object",
  required: ["id", "period", "parts"],
  properties: getFinancialReport(),
};

function getFinancialReport(
  partRequired?: (keyof FinancialPartDTOTypes)[],
  periodRequired?: (keyof FinancialPeriodDTOTypes)[],
) {
  return {
    id: { type: "string" },
    parts: {
      type: "array",
      required: partRequired ?? ["id", "income", "common", "piggyBank", "free"],
      item: FinancialPart,
    },
    period: {
      type: "object",
      required: periodRequired ?? ["month", "partCount"],
      properties: FinancialPeriod,
    },
  };
}
