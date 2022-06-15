const CorrectionSchema = {
  name: { type: "string" },
  amount: { type: "number" },
};

const CorrectionCreateSchema = {
  type: "object",
  required: ["name", "amount", "financialPartId"],
  properties: { financialPartId: { type: "string" }, ...CorrectionSchema },
};

const CorrectionUpdateSchema = {
  type: "object",
  required: ["id", "name", "amount"],
  properties: { id: { type: "string" }, ...CorrectionSchema },
};

const CorrectionDeleteSchema = {
  type: "object",
  required: ["correctionId"],
  properties: { correctionId: { type: "string" } },
};

const CorrectionDeleteByFinancialPartIdSchema = {
  type: "object",
  required: ["financialPartId"],
  properties: { financialPartId: { type: "string" } },
};

const CorrectionSearchSchema = {
  type: "object",
  properties: {
    financialPartId: { type: "string" },
    ids: {
      type: "array",
      minItems: 1,
      items: { type: "string" },
    },
  },
};

const CorrectionResponseSchema = {
  type: "object",
  required: ["id", "name", "amount"],
  properties: { id: { type: "string" }, ...CorrectionSchema },
};

export const validationSchemaCreate = {
  tags: ["Correction"],
  description: "Create a correction",
  body: CorrectionCreateSchema,
  response: { 201: CorrectionResponseSchema },
};

export const validationSchemaUpdate = {
  tags: ["Correction"],
  description: "Update a correction",
  body: CorrectionUpdateSchema,
  response: { 200: CorrectionResponseSchema },
};

export const validationSchemaDelete = {
  tags: ["Correction"],
  description: "Delete a correction",
  body: CorrectionDeleteSchema,
  response: { 200: { type: "boolean" } },
};

export const validationSchemaDeleteByFinancialPartId = {
  tags: ["Correction"],
  description: "Delete corrections by financial part id",
  body: CorrectionDeleteByFinancialPartIdSchema,
  response: { 200: { type: "boolean" } },
};

export const validationSchemaSearch = {
  tags: ["Correction"],
  description: "Search corrections",
  body: CorrectionSearchSchema,
  response: {
    200: {
      type: "array",
      items: CorrectionResponseSchema,
    },
  },
};
