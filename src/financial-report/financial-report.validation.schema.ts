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

export const FinancialPeriodResponseSchema = {
  type: "object",
  required: ["id", "period", "parts"],
  properties: {
    id: { type: "string" },
    parts: {
      type: "array",
      required: ["id", "income", "common", "piggyBank", "free"],
      items: FinancialPartSchema,
    },
    period: {
      type: "object",
      required: ["month", "year", "partCount"],
      properties: FinancialPeriodSchema,
    },
  },
};

export const FinancialPeriodCreateSchema = {
  type: "object",
  required: ["period", "parts"],
  properties: {
    parts: {
      type: "array",
      required: ["income", "common", "piggyBank", "free"],
      items: FinancialPartSchema,
    },
    period: {
      type: "object",
      required: ["month", "year", "partCount"],
      properties: FinancialPeriodSchema,
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
