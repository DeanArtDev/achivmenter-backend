/*
  Warnings:

  - Added the required column `type` to the `corrections` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CorrectionType" AS ENUM ('common', 'piggyBank', 'free');

-- AlterTable
ALTER TABLE "corrections" ADD COLUMN     "type" "CorrectionType" NOT NULL;
