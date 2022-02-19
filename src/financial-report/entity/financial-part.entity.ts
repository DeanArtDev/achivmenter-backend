export default class FinancialPart {
  constructor(
    public readonly income: number,
    public readonly common: number,
    public readonly piggyBank: number,
    public readonly free: number,
  ) {}
}
