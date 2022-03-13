import CorsPlugin from "./app/plugins/cors.plugin";

export const dependenciesType = {
  IApp: Symbol.for("IApp"),
  ILogger: Symbol.for("ILogger"),
  IConfigService: Symbol.for("IConfigService"),
  IDataBaseService: Symbol.for("IDataBaseService"),
  IExceptionFilter: Symbol.for("IExceptionFilter"),

  CorsPlugin: Symbol.for("CorsPlugin"),

  IFinancialReportController: Symbol.for("IFinancialReportController"),
  IFinancialReportService: Symbol.for("IFinancialReportService"),
  IFinancialReportRepository: Symbol.for("IFinancialReportRepository"),
  IFinancialPartRepository: Symbol.for("IFinancialPartRepository"),
};
