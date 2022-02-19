-- CreateTable
CREATE TABLE "FinancialPeriodModel" (
    "id" SERIAL NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" INTEGER NOT NULL,
    "partCount" SMALLINT NOT NULL,
    "financialReportId" INTEGER NOT NULL,

    CONSTRAINT "FinancialPeriodModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialPartModel" (
    "id" SERIAL NOT NULL,
    "income" INTEGER NOT NULL,
    "common" SMALLINT NOT NULL,
    "piggyBank" SMALLINT NOT NULL,
    "free" SMALLINT NOT NULL,
    "financialReportId" INTEGER NOT NULL,

    CONSTRAINT "FinancialPartModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialReportModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancialReportModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialPeriodModel_financialReportId_key" ON "FinancialPeriodModel"("financialReportId");

-- AddForeignKey
ALTER TABLE "FinancialPeriodModel" ADD CONSTRAINT "FinancialPeriodModel_financialReportId_fkey" FOREIGN KEY ("financialReportId") REFERENCES "FinancialReportModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialPartModel" ADD CONSTRAINT "FinancialPartModel_financialReportId_fkey" FOREIGN KEY ("financialReportId") REFERENCES "FinancialReportModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
