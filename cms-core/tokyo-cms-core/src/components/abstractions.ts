import { state } from './store'

const apiBaseUrl = 'http://localhost:9090/v1'
const apiUrl = (apiEndpoint) => `${apiBaseUrl}/${apiEndpoint}`

export const GetAppLangs = async (appId: string) => {
  let response = await ApiGet(`app?appId=${appId}`)
  let json = await response.json()
  return json.cms.languages
}

export const GetLabels = async (appId: string) => {
  let response = await ApiGet(`labels?appId=${appId}`)
  let json = await response.json()
  let labels = {}
  for (let item of json) {
    labels = { ...labels, [item.id]: item }
  }
  return labels
}

export const UpdateLabelValue = async (labelId: string, lang: string, newValue: string) => {
  console.log(lang)
  console.log(newValue)
  let appId = state.appId
  let label = state.labels[labelId]
  console.log(label)
  label.values[lang] = newValue
  console.log(label)
  state.labels = { ...state.labels, [labelId]: label }
  let response = await ApiPut('label', { appId: appId, label: label })
  return response
}

const ApiGet = (apiEndpoint: string): Promise<Response> => {
  return fetch(apiUrl(apiEndpoint))
}

// const ApiPost = (apiEndpoint: string, data: object): Promise<Response> => {
//   let body = { data: data }
//   return fetch(apiUrl(apiEndpoint), {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: { 'Content-Type': 'application/json' }
//   })
// }

const ApiPut = (apiEndpoint: string, data: object): Promise<Response> => {
  let body = { data: data }
  return fetch(apiUrl(apiEndpoint), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
}