import FinancialPeriod from "./financial-period.entity";
import FinancialPart from "./financial-part.entity";

export default class FinancialReport {
  public readonly period!: FinancialPeriod;
  public readonly parts!: FinancialPart[];

  constructor(period: FinancialPeriod, parts: FinancialPart[]) {
    this.period = new FinancialPeriod(period.month, period.partCount, period.year);
    this.parts = parts.map((p) => new FinancialPart(p.income, p.common, p.piggyBank, p.free));
  }
}
