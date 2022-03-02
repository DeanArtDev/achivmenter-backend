/*
  Warnings:

  - You are about to drop the `FinancialPeriodModel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `month` to the `FinancialReportModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partCount` to the `FinancialReportModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `FinancialReportModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FinancialPartModel" DROP CONSTRAINT "FinancialPartModel_financialReportId_fkey";

-- DropForeignKey
ALTER TABLE "FinancialPeriodModel" DROP CONSTRAINT "FinancialPeriodModel_financialReportId_fkey";

-- AlterTable
ALTER TABLE "FinancialReportModel" ADD COLUMN     "month" SMALLINT NOT NULL,
ADD COLUMN     "partCount" SMALLINT NOT NULL,
ADD COLUMN     "year" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "FinancialPeriodModel";

-- AddForeignKey
ALTER TABLE "FinancialPartModel" ADD CONSTRAINT "FinancialPartModel_financialReportId_fkey" FOREIGN KEY ("financialReportId") REFERENCES "FinancialReportModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
