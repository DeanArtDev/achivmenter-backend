import { Container, ContainerModule, interfaces } from "inversify";
import { App, IApp } from "./app";
import ILogger from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { dependenciesType } from "./dependencies.types";
import { ConfigService, IConfigService } from "./config";
import { DataBaseService, IDataBaseService } from "./database";
import { IFinancialReportController, FinancialReportController } from "./financial-report/controller";
import { FinancialReportRepository, IFinancialReportRepository } from "./financial-report/repository";
import { FinancialReportService, IFinancialReportService } from "./financial-report/service";

const modules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IApp>(dependenciesType.IApp).to(App).inSingletonScope();

  bind<ILogger>(dependenciesType.ILogger).to(LoggerService).inSingletonScope();

  bind<IConfigService>(dependenciesType.IConfigService).to(ConfigService).inSingletonScope();
  bind<IDataBaseService>(dependenciesType.IDataBaseService).to(DataBaseService).inSingletonScope();

  // #financial-report
  bind<IFinancialReportService>(dependenciesType.IFinancialReportService).to(FinancialReportService).inSingletonScope();
  bind<IFinancialReportRepository>(dependenciesType.IFinancialReportRepository).to(FinancialReportRepository).inSingletonScope();
  bind<IFinancialReportController>(dependenciesType.IFinancialReportController)
    .to(FinancialReportController)
    .inSingletonScope();
});

const bootstrap = () => {
  const container = new Container();
  container.load(modules);
  const app = container.get<IApp>(dependenciesType.IApp);
  app.init();
};
bootstrap();
