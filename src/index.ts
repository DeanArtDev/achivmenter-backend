import { Container, ContainerModule, interfaces } from "inversify";
import { App, IApp } from "./app";
import ILogger from "./logger/logger.interface";
import { LoggerService } from "./logger";
import { dependenciesType } from "./dependencies.types";
import { ConfigService, IConfigService } from "./config";
import { DataBaseService, IDataBaseService } from "./database";
import { IFinancialReportController, FinancialReportController } from "./financial-report/controller";
import {
  FinancialReportRepository,
  IFinancialReportRepository,
  FinancialPartRepository,
  IFinancialPartRepository,
} from "./financial-report/repository";
import { FinancialReportService, IFinancialReportService } from "./financial-report/service";
import { CorsPlugin, IAppPlugin } from "./app/plugins";

const commonModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IApp>(dependenciesType.IApp).to(App).inSingletonScope();
  bind<ILogger>(dependenciesType.ILogger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(dependenciesType.IConfigService).to(ConfigService).inSingletonScope();
  bind<IDataBaseService>(dependenciesType.IDataBaseService).to(DataBaseService).inSingletonScope();
});

const pluginsModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAppPlugin>(dependenciesType.CorsPlugin).to(CorsPlugin).inSingletonScope();
});

const financialModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IFinancialReportController>(dependenciesType.IFinancialReportController)
    .to(FinancialReportController)
    .inSingletonScope();

  bind<IFinancialReportService>(dependenciesType.IFinancialReportService).to(FinancialReportService).inSingletonScope();

  bind<IFinancialReportRepository>(dependenciesType.IFinancialReportRepository)
    .to(FinancialReportRepository)
    .inSingletonScope();
  bind<IFinancialPartRepository>(dependenciesType.IFinancialPartRepository)
    .to(FinancialPartRepository)
    .inSingletonScope();
});

/* todo:
 *   1. [-] большая проблемма, при ошибке в репозитории (создание, update) ни чего не отвечаем пользователю
 *   2. [-] большая проблемма, нет внятной обработки exeptions
 * */
const bootstrap = () => {
  const container = new Container();
  container.load(commonModules);
  container.load(pluginsModules);
  container.load(financialModules);
  const app = container.get<IApp>(dependenciesType.IApp);
  app.init();
};
bootstrap();
