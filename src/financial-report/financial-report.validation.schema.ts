const FinancialPartSchema = {
  income: { type: "number" },
  common: { type: "number" },
  piggyBank: { type: "number" },
  free: { type: "number" },
};

const FinancialPeriodSchema = {
  month: { type: "number" },
  year: { type: "number" },
  partCount: { type: "number" },
};

function getFinancialReportSchema(
  partRequired?: FinancialPartSchemaTypes[],
  periodRequired?: FinancialPeriodSchemaTypes[],
) {
  return {
    parts: {
      type: "array",
      required: partRequired ?? ["income", "common", "piggyBank", "free"],
      item: FinancialPartSchema,
    },
    period: {
      type: "object",
      required: periodRequired ?? ["month", "year", "partCount"],
      properties: FinancialPeriodSchema,
    },
  };
}

type FinancialPartSchemaTypes = "id" | "income" | "common" | "piggyBank" | "free";
type FinancialPeriodSchemaTypes = "month" | "partCount";

export const FinancialPeriodResponseSchema = {
  type: "object",
  required: ["id", "period", "parts"],
  properties: {
    id: { type: "string" },
    ...getFinancialReportSchema(["id", "income", "common", "piggyBank", "free"]),
    parts: {
      ...getFinancialReportSchema(["id", "income", "common", "piggyBank", "free"]).parts,
      item: {
        id: { type: "string" },
        ...FinancialPartSchema,
      },
    },
  },
};

export const FinancialPeriodRequestSchema = {
  type: "object",
  required: ["period", "parts"],
  properties: getFinancialReportSchema(),
};

export const validationSchemaOfCreate = {
  tags: ["Financial report"],
  description: "Create a financial report",
  body: FinancialPeriodRequestSchema,
  response: { 200: FinancialPeriodResponseSchema },
};

export const validationSchemaOfGetAll = {
  tags: ["Financial report"],
  description: "Get all financial reports",
  response: {
    200: {
      type: "array",
      item: FinancialPeriodResponseSchema,
    },
  },
};
