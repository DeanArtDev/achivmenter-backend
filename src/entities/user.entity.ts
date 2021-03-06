import { compare, hash } from "bcryptjs";

export default class User {
  constructor(public readonly email: string, private _password: string, passwordHash?: string) {
    if (passwordHash) this._password = passwordHash;
  }

  public get password(): string {
    return this._password;
  }

  public async encodePassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this._password);
  }
}
