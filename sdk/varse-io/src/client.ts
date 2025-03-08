import axios from 'axios'
import { VariableValue } from './types'

interface VarseClientOptions {
  apiKey: string
  baseUrl: string
}

class VarseClient {
  private config: VarseClientOptions

  constructor(options: VarseClientOptions) {
    this.config = options
  }

  async get(variableId: string): Promise<VariableValue> {
    const headers = { 'x-api-key': this.config.apiKey }
    const route = `${this.config.baseUrl}/variable/${variableId}`
    try {
      const response = await axios.get(route, { headers })
      return response.data.value
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error
      }
      switch (error.response?.status) {
        case 401:
          throw new Error('Invalid API key')
        case 404:
          throw new Error('Variable not found')
        default:
          throw new Error('Unknown error, please create a ticket.')
      }
    }
  }

  async getBool(variableId: string): Promise<boolean> {
    const value = await this.get(variableId)
    try {
      return value === 'true'
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a boolean`)
    }
  }

  async getString(variableId: string): Promise<string> {
    const value = await this.get(variableId)
    try {
      return String(value)
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a string`)
    }
  }

  async getNumber(variableId: string): Promise<number> {
    const value = await this.get(variableId)
    try {
      return Number(value)
    } catch (error) {
      throw new Error(`Variable ${variableId} is not a number`)
    }
  }

  async getGroup(groupId: string): Promise<VariableValue[]> {
    const headers = { 'x-api-key': this.config.apiKey }
    const route = `${this.config.baseUrl}/group/${groupId}/variables`
    try {
      const response = await axios.get(route, { headers })
      return response.data.value
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw error
      }
      switch (error.response?.status) {
        case 401:
          throw new Error('Invalid API key')
        case 404:
          throw new Error('Variable not found')
        default:
          throw new Error('Unknown error, please create a ticket.')
      }
    }
  }
}

export { VarseClient, VarseClientOptions }
