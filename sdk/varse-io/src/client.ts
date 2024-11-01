import axios from "axios";
import { VariableValue } from "./types";

interface VarseClientOptions {
  apiKey: string;
  baseUrl: string;
}

class VarseClient {
  private config: VarseClientOptions;

  constructor(options: VarseClientOptions) {
    this.config = options;
  }

  async get(variableId: string): Promise<VariableValue> {
    const headers = { "x-api-key": this.config.apiKey };
    const route = `${this.config.baseUrl}/variable/${variableId}`;
    const response = await axios.get(route, { headers });
    return response.data.value;
  }

  async getBool(variableId: string): Promise<boolean> {
    const value = await this.get(variableId);
    try {
      return Boolean(value);
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a boolean`);
    }
  }

  async getString(variableId: string): Promise<string> {
    const value = await this.get(variableId);
    try {
      return String(value);
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a string`);
    }
  }

  async getNumber(variableId: string): Promise<number> {
    const value = await this.get(variableId);
    try {
      return Number(value);
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a number`);
    }
  }
}

export { VarseClient, VarseClientOptions };
