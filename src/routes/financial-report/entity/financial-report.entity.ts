import FinancialPart from "./financial-part.entity";

export default class FinancialReport {
  public readonly parts!: FinancialPart[];

  constructor(
    public readonly month: number,
    public readonly year: number,
    public readonly partCount: number,
    parts: FinancialPart[],
  ) {
    this.parts = parts.map((p) => new FinancialPart(p.income, p.common, p.piggyBank, p.free));
  }
}
