import FinancialPeriod from "./financial-period.entity";
import FinancialPart from "./financial-part.entity";

export default class FinancialReport {
  public readonly period!: FinancialPeriod;
  public readonly parts!: FinancialPart[];

  constructor(
    period: { month: number; year: number; partCount: number },
    parts: { income: number; common: number; piggyBank: number; free: number }[],
  ) {
    this.period = new FinancialPeriod(period.month, period.partCount, period.year);
    this.parts = parts.map((p) => new FinancialPart(p.income, p.common, p.piggyBank, p.free));
  }
}
