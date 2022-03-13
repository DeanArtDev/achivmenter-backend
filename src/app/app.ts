import Fastify, { FastifyInstance } from "fastify";
import { inject, injectable } from "inversify";
import { IApp } from "./app.interface";
import { IFinancialReportController } from "../financial-report/controller";
import { IConfigService, envVariable } from "../config";
import { AppRoute } from "../types/route.types";
import { ILogger } from "../logger";
import { IDataBaseService } from "../database";
import { IAppPlugin, CorsPlugin } from "./plugins";
import { dependenciesType } from "../dependencies.types";
import "reflect-metadata";

const API_PREFIX = "/api"

@injectable()
export class App implements IApp {
  private app: FastifyInstance;

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
      { prefix: API_PREFIX },
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
      this.registerPlugins();
      await this.bindRouters();
      await this.db.connect();
      const address = await this.app.listen(
        this.config.get(envVariable.API_PORT),
        this.config.get(envVariable.API_ADDRESS),
      );
      this.loggerService.log(
        `[APP] Server start listening to ${address}${API_PREFIX} ${
          this.config.isDevelopmentMode ? `http://localhost:${this.config.get(envVariable.API_PORT)}${API_PREFIX}` : ""
        }`,
      );
    } catch (e) {
      this.loggerService.error(`[APP] something went wrong`, e);
    }
  }

  public async close(): Promise<void> {
    await this.app.close();
  }
}
