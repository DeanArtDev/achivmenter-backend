import { AppRoute } from "../types/route.types";
import { FinancialReport } from "./types";

export default interface IFinancialReportController {
  // getAll(): Promise<FinancialReport[]>;
  getAll(): Promise<string[]>;
  routes: AppRoute[];
}
