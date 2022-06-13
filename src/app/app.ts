import Fastify, { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";
import { IApp } from "./app.interface";
import { IFinancialReportController } from "../routes/financial-report/controller";
import { IUserController } from "../routes/user/controller";
import ICorrectionController from "../routes/correction/controller/correction.controller.interface";
import { envVariable, IConfigService } from "../config";
import { AppRoute } from "../types/route.types";
import { ILogger } from "../logger";
import { IDataBaseService } from "../database";
import { CorsPlugin, IAppPlugin } from "./plugins";
import { dependenciesType } from "../dependencies.types";
import "reflect-metadata";

@injectable()
export class App implements IApp {
  constructor(
    @inject(dependenciesType.IConfigService) private configService: IConfigService,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,

    @inject(dependenciesType.IFinancialReportController) private financialReportController: IFinancialReportController,
    @inject(dependenciesType.IUserController) private userController: IUserController,
    @inject(dependenciesType.ICorrectionController) private correctionController: ICorrectionController,

    @inject(dependenciesType.AuthorizationPlugin) private authorizationPlugin: IAppPlugin,
  ) {
    this.app = Fastify();
  }

  public async init(): Promise<void> {
    try {
      await this.db.connect();
      await this.registerPlugins();
      await this.bindRouters();
      const address = await this.app.listen(this.apiPort, this.apiAddress);
      this.loggerService.log(
        `[APP] Server start listening to ${address}${this.apiInitialPath} ${
          this.configService.isDevelopmentMode ? `http://localhost:${this.apiPort}${this.apiPrefix}` : ""
        }`,
      );
    } catch (e) {
      this.loggerService.error(`[APP] something went wrong`, e);
    }
  }

  public async close(): Promise<void> {
    await this.app.close();
  }

  private app: FastifyInstance;

  private get apiPrefix(): string {
    return this.configService.get(envVariable.API_INITIAL_PATH);
  }

  private get apiPort(): number {
    return Number(this.configService.get(envVariable.API_PORT));
  }

  private get apiInitialPath(): string {
    return this.configService.get(envVariable.API_INITIAL_PATH);
  }

  private get apiAddress(): string {
    return this.configService.get(envVariable.API_ADDRESS);
  }

  private get availableOrigins(): string[] {
    return this.configService.get(envVariable.API_AVAILABLE_CORS).split(", ");
  }

  private async bindRouters(): Promise<void> {
    const routes: AppRoute[] = [];
    routes.push(
      ...this.financialReportController.routes,
      ...this.userController.routes,
      ...this.correctionController.routes,
    );

    await this.app.register(
      (instance, _, done) => {
        for (const route of routes) {
          instance.route(route);
          this.loggerService.log(`[APP - ROUTE] ${route.method}:${route.url} is successful added`);
        }
        done();
      },
      { prefix: this.apiPrefix },
    );
  }

  private async registerPlugins(): Promise<void> {
    const plugins: IAppPlugin[] = [new CorsPlugin(this.availableOrigins), this.authorizationPlugin];

    for (const plugin of plugins) {
      const { pluginEntity, options } = plugin.install();
      await this.app.register(pluginEntity, options);
      this.loggerService.log(`[APP - PLUGIN] ${plugin.displayName} is successful registered`);
    }
  }
}
