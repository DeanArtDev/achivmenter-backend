import { FinancialReportModel } from "@prisma/client";
import { AppRoute } from "../../types/route.types";

export default interface IFinancialReportController {
  routes: AppRoute[];
}