import { App, IApp } from "./app";
import { Container, ContainerModule, interfaces } from 'inversify';
import ILogger from "./logger/logger.interface";
import { LoggerService } from './logger/logger.service';
import { dependenciesType } from './dependencies.types';
import { ConfigService,  IConfigService }from './config';

const modules = new ContainerModule((bind: interfaces.Bind) => {
    bind<IApp>(dependenciesType.IApp).to(App).inSingletonScope();
    bind<ILogger>(dependenciesType.ILogger).to(LoggerService).inSingletonScope();
    bind<IConfigService>(dependenciesType.IConfigService).to(ConfigService).inSingletonScope();
})

const bootstrap = () => {
    const container = new Container();
    container.load(modules);
    const app = container.get<IApp>(dependenciesType.IApp);
    app.init();
}
bootstrap();


