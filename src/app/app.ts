import Fastify, { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";
import { IApp } from "./app.interface";
import { IFinancialReportController } from "../routes/financial-report/controller";
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
    @inject(dependenciesType.IConfigService) private config: IConfigService,
    @inject(dependenciesType.IDataBaseService) private readonly db: IDataBaseService,
    @inject(dependenciesType.ILogger) private readonly loggerService: ILogger,
    @inject(dependenciesType.IFinancialReportController) private financialReportController: IFinancialReportController,
    @inject(dependenciesType.CorsPlugin) private corsPlugin: CorsPlugin,
  ) {
    this.app = Fastify();
  }

  public async init(): Promise<void> {
    try {
      await this.db.connect();
      this.registerPlugins();
      await this.bindRouters();
      const address = await this.app.listen(this.apiPort, this.apiAddress);
      this.loggerService.log(
        `[APP] Server start listening to ${address}${this.apiInitialPath} ${
          this.config.isDevelopmentMode ? `http://localhost:${this.apiPort}${this.apiPrefix}` : ""
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
    return this.config.get(envVariable.API_INITIAL_PATH);
  }

  private get apiPort(): number {
    return Number(this.config.get(envVariable.API_PORT));
  }

  private get apiInitialPath(): string {
    return this.config.get(envVariable.API_INITIAL_PATH);
  }

  private get apiAddress(): string {
    return this.config.get(envVariable.API_ADDRESS);
  }

  private async bindRouters(): Promise<void> {
    //todo: [improvement] add public / private routes
    const routes: AppRoute[] = [];
    routes.push(...this.financialReportController.routes);

    await this.app.register(
      (instance, _, done) => {
        for (const route of routes) {
          instance.route(route);
          this.loggerService.log(`[APP - ROUTE] ${route.method}:${route.url} is successful added`);
          done();
        }
      },
      { prefix: this.apiPrefix },
    );
  }

  private registerPlugins(): void {
    const plugins: IAppPlugin[] = [];
    plugins.push(this.corsPlugin);

    for (const plugin of plugins) {
      const { pluginEntity, options } = plugin.install();
      this.app.register(pluginEntity, options);
      this.loggerService.log(`[APP - PLUGIN] ${plugin.displayName} is successful registered`);
    }
  }
}
