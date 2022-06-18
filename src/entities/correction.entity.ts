import { CorrectionModel } from "@prisma/client";

export default class Correction {
  constructor(
    public readonly name: string,
    public readonly amount: number,
    public readonly type: CorrectionModel["type"],
  ) {}
}
