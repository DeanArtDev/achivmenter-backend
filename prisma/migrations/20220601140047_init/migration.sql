-- CreateTable
CREATE TABLE "financial_parts" (
    "id" SERIAL NOT NULL,
    "income" INTEGER NOT NULL,
    "common" SMALLINT NOT NULL,
    "free" SMALLINT NOT NULL,
    "biggy_bank" SMALLINT NOT NULL,
    "financial_report_id" INTEGER NOT NULL,

    CONSTRAINT "financial_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_reports" (
    "id" SERIAL NOT NULL,
    "month" SMALLINT NOT NULL,
    "year" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "part_count" SMALLINT NOT NULL,

    CONSTRAINT "financial_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corrections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "financial_part_id" INTEGER NOT NULL,

    CONSTRAINT "corrections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "financial_parts" ADD CONSTRAINT "financial_parts_financial_report_id_fkey" FOREIGN KEY ("financial_report_id") REFERENCES "financial_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_financial_part_id_fkey" FOREIGN KEY ("financial_part_id") REFERENCES "financial_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
