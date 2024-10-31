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
    return response.data;
  }

  async getBool(variableId: string): Promise<boolean> {
    const value = await this.get(variableId);
    return value === "true";
  }
}

export { VarseClient, VarseClientOptions };
