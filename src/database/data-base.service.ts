import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { dependenciesType } from "../dependencies.types";
import { ILogger } from "../logger";
import IDataBaseService from "./data-base.service.interface";
import "reflect-metadata";

@injectable()
export default class DataBaseService implements IDataBaseService {
  public client!: PrismaClient;

  constructor(@inject(dependenciesType.ILogger) private readonly logger: ILogger) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log(`[DataBaseService] Connection to the Data base is success`);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[DataBaseService] Connection to the Data base is failed`, e.message);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log(`[DataBaseService] Data base was disconnected`);
  }
}
