export interface IApp {
  init(): Promise<void>;
  close(): Promise<void>;
}
