import axios from 'axios'

export class HTTPService {
  private url: string

  constructor(url: string) {
    this.url = url
  }

  public async request<T>(
    path: string,
    method: string,
    body?: any,
    headers?: any,
  ): Promise<T> {
    return axios
      .request({
        method: method,
        url: this.url + path,
        data: body || {},
        headers: headers || {},
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }
}
