import axios from 'axios'

const apiUrl = 'http://localhost:9090/v1'
const url = (endpoint: string) => (`${apiUrl}/${endpoint}`)

const ApiGet = (endpoint: string, params?: {}): any => {
  return axios.get(url(endpoint), { params: params })
}

const ApiPut = (endpoint: string, body?: {}): any => {
  return axios.put(url(endpoint), { data: body })
}

const ApiPost = (endpoint: string, body?: {}): any => {
  return axios.post(url(endpoint), { data: body })
}

const ApiDelete = (endpoint: string, body?: {}): any => {
  return axios.delete(url(endpoint), { data: body })
}

type DatabaseResponse = {
  title?: string
  message?: string
  statusCode?: string
  data?: any
}

export { ApiGet, ApiPut, ApiPost, ApiDelete, DatabaseResponse }
