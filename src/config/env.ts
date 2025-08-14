import dotenv from "dotenv";

dotenv.config();

export class EnvConfig {
  static get(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && !defaultValue) {
      throw new Error(`Environment variable ${key} is not defined`);
    }

    return value || defaultValue!;
  }
}
