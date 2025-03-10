import { readFileSync } from 'fs'

export class SecretsService {
  static read = (filename: string) => {
    const contents = readFileSync(filename, {
      encoding: 'utf-8',
    })
    return contents
  }
}
