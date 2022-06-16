import { Container, ContainerModule, interfaces } from "inversify";
import { App, IApp } from "./app";
import { LoggerService, ILogger } from "./logger";
import { dependenciesType } from "./dependencies.types";
import { ConfigService, IConfigService } from "./config";
import { DataBaseService, IDataBaseService } from "./database";
import { IFinancialReportController, FinancialReportController } from "./routes/financial-report/controller";
import { FinancialReportService, IFinancialReportService } from "./routes/financial-report/service";
import { ExceptionFilter, IExceptionFilter } from "./error";
import FinancialPartRepository from "./repositories/financial-part.repository";
import IFinancialReportRepository from "./repositories/interfaces/financial-report.repository.interface";
import FinancialReportRepository from "./repositories/financial-report.repository";
import IFinancialPartRepository from "./repositories/interfaces/financial-part.repository.interface";
import { IUserController, UserController } from "./routes/user/controller";
import { JWTService, IJWTService } from "./services/jwt-service";
import { AuthorizationPlugin, IAppPlugin } from "./app/plugins";
import IUserRepository from "./repositories/interfaces/user.repository.interface";
import UserRepository from "./repositories/user.repository";
import IUserService from "./routes/user/service/user.service.interface";
import UserService from "./routes/user/service/user.service";
import ICorrectionRepository from "./repositories/interfaces/correctin.repository.interface";
import CorrectionRepository from "./repositories/correction.repository";
import ICorrectionController from "./routes/correction/controller/correction.controller.interface";
import CorrectionController from "./routes/correction/controller/correction.controller";
import ICorrectionService from "./routes/correction/service/correction.service.interface";
import CorrectionService from "./routes/correction/service/correction.service";

const commonModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IApp>(dependenciesType.IApp).to(App).inSingletonScope();
  bind<ILogger>(dependenciesType.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(dependenciesType.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<IConfigService>(dependenciesType.IConfigService).to(ConfigService).inSingletonScope();
  bind<IDataBaseService>(dependenciesType.IDataBaseService).to(DataBaseService).inSingletonScope();
  bind<IJWTService>(dependenciesType.IJWTService).to(JWTService).inSingletonScope();
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

const correctionModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICorrectionController>(dependenciesType.ICorrectionController).to(CorrectionController).inSingletonScope();
  bind<ICorrectionService>(dependenciesType.ICorrectionService).to(CorrectionService).inSingletonScope();
  bind<ICorrectionRepository>(dependenciesType.ICorrectionRepository).to(CorrectionRepository).inSingletonScope();
});

const userModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserController>(dependenciesType.IUserController).to(UserController).inSingletonScope();
  bind<IUserService>(dependenciesType.IUserService).to(UserService).inSingletonScope();
  bind<IUserRepository>(dependenciesType.IUserRepository).to(UserRepository).inSingletonScope();
});

const pluginModules = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAppPlugin>(dependenciesType.AuthorizationPlugin).to(AuthorizationPlugin).inSingletonScope();
});

/* todo:
 *   1. [-] большая проблемма, при ошибке в репозитории (создание, update) ни чего не отвечаем пользователю
 *   2. [-] большая проблемма, нет внятной обработки exceptions
 * */
const bootstrap = () => {
  const container = new Container();
  container.load(commonModules);
  container.load(financialModules);
  container.load(correctionModules);
  container.load(userModules);
  container.load(pluginModules);
  const app = container.get<IApp>(dependenciesType.IApp);
  app.init();
};
bootstrap();
