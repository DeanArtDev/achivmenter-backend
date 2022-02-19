import { Container, ContainerModule, interfaces } from "inversify";
import { App, IApp } from "./app";
import ILogger from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { dependenciesType } from "./dependencies.types";
import { ConfigService, IConfigService } from "./config";
import { IFinancialReportController, FinancialReportController } from "./financial-report";
import { DataBaseService, IDataBaseService } from "./database";

const modules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IApp>(dependenciesType.IApp).to(App).inSingletonScope();

  bind<ILogger>(dependenciesType.ILogger).to(LoggerService).inSingletonScope();

  bind<IConfigService>(dependenciesType.IConfigService).to(ConfigService).inSingletonScope();
  bind<IDataBaseService>(dependenciesType.IDataBaseService).to(DataBaseService).inSingletonScope();
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
