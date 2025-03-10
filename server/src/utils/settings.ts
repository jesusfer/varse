import { SecretsService } from './secrets'

export class SettingsService {
  /**
   * Read a setting first as a secret in a file,
   * then as an env var or return a default value.
   * Throws if no default value.
   * The name will be searched with a SERVER_ prefix.
   */
  static get = (name: string, default_value: string = '') => {
    const nameUpper = name.toUpperCase()
    const filename = process.env[`SERVER_${nameUpper}_FILE`]
    if (filename) {
      return SecretsService.read(filename)
    }
    const variable = process.env[`SERVER_${nameUpper}`]
    if (variable || default_value) return variable || default_value
    throw new Error(
      `Setting "${name}" not found and no default value provided.`
    )
  }
}
