-- CreateTable
CREATE TABLE "financial_parts" (
    "id" SERIAL NOT NULL,
    "income" INTEGER NOT NULL,
    "common" SMALLINT NOT NULL,
    "piggyBank" SMALLINT NOT NULL,
    "free" SMALLINT NOT NULL,
    "financialReportId" INTEGER NOT NULL,

    CONSTRAINT "financial_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_reports" (
    "id" SERIAL NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" SMALLINT NOT NULL,
    "partCount" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "financial_parts" ADD CONSTRAINT "financial_parts_financialReportId_fkey" FOREIGN KEY ("financialReportId") REFERENCES "financial_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
