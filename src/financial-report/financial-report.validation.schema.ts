const FinancialPartSchema = {
  id: { type: "string" },
  income: { type: "number" },
  common: { type: "number" },
  piggyBank: { type: "number" },
  free: { type: "number" },
};

const FinancialPeriodSchema = {
  month: { type: "number" },
  partCount: { type: "number" },
};

export const FinancialPeriodResponseSchema = {
  type: "object",
  required: ["id", "period", "parts"],
  properties: getFinancialReportSchema(),
};

function getFinancialReportSchema(
  partRequired?: FinancialPartSchemaTypes[],
  periodRequired?: FinancialPeriodSchemaTypes[],
) {
  return {
    id: { type: "string" },
    parts: {
      type: "array",
      required: partRequired ?? ["id", "income", "common", "piggyBank", "free"],
      item: FinancialPartSchema,
    },
    period: {
      type: "object",
      required: periodRequired ?? ["month", "partCount"],
      properties: FinancialPeriodSchema,
    },
  };
}

type FinancialPartSchemaTypes = "id" | "income" | "common" | "piggyBank" | "free";
type FinancialPeriodSchemaTypes = "month" | "partCount";
