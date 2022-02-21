const FinancialPartSchema = {
  income: { type: "number" },
  common: { type: "number" },
  piggyBank: { type: "number" },
  free: { type: "number" },
};

const FinancialPeriodResponseSchema = {
  type: "object",
  required: ["id", "period", "month", "year", "partCount"],
  properties: {
    id: { type: "string" },
    month: { type: "number" },
    year: { type: "number" },
    partCount: { type: "number" },
    parts: {
      type: "array",
      required: ["id", "income", "common", "piggyBank", "free"],
      items: FinancialPartSchema,
    },
  },
};

const FinancialPeriodCreateSchema = {
  type: "object",
  required: ["parts", "month", "year", "partCount"],
  month: { type: "number" },
  year: { type: "number" },
  partCount: { type: "number" },
  properties: {
    parts: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["income", "common", "piggyBank", "free"],
        properties: FinancialPartSchema,
      },
    },
  },
};

export const validationSchemaOfCreate = {
  tags: ["Financial report"],
  description: "Create a financial report",
  body: FinancialPeriodCreateSchema,
  response: { 201: FinancialPeriodResponseSchema },
};

export const validationSchemaOfGetAll = {
  tags: ["Financial report"],
  description: "Get all financial reports",
  response: {
    200: {
      type: "array",
      items: FinancialPeriodResponseSchema,
    },
  },
};
