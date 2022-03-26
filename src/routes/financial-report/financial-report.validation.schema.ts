const FinancialPartSchema = {
  income: { type: "number" },
  common: { type: "number" },
  piggyBank: { type: "number" },
  free: { type: "number" },
};

//todo: узнать можно ли ругаться если поданы лишние даннве в DTO
const FinancialPeriodResponseSchema = {
  type: "object",
  required: ["id", "month", "year", "partCount"],
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

export const validationSchemaCreate = {
  tags: ["Financial report"],
  description: "Create a financial report",
  body: FinancialPeriodCreateSchema,
  response: { 201: FinancialPeriodResponseSchema },
};

export const validationSchemaDelete = {
  tags: ["Financial report"],
  description: "Delete a financial report",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: { 201: FinancialPeriodResponseSchema },
};

export const validationSchemaGetAll = {
  tags: ["Financial report"],
  description: "Get all financial reports",
  response: {
    200: {
      type: "array",
      items: FinancialPeriodResponseSchema,
    },
  },
};
