import { PrismaClient } from "@prisma/client";
export default interface IDataBaseService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  client: PrismaClient;
}
