// import { App } from '../models/App.model';
import { Label } from '../models/Label.model';
import { ApiGet, ApiPut, DatabaseResponse } from './Api.service';

const DatabaseGetLabels = (appId: string): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiGet('labels', { appId: appId })
      .then(res => {
        const labels = res.data.map(label => new Label(label))
        resolve({ data: labels })
      })
      .catch(err => reject({ data: err }))
  })
  return promise
}

const DatabaseGetLabelNames = (appId: string, labelIds: string[]): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiGet('labels/names', { appId: appId, labelIds: labelIds })
      .then(res => resolve({ data: res.data }))
      .catch(err => reject({ data: err }))
  })
  return promise
}

const DatabaseUpdateLabelNames = (appId: string, labelNames: Object): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiPut('labels/names', { appId: appId, labelNames: labelNames })
      .then(res => resolve({ data: res.data }))
      .catch(err => reject({ data: err }))
  })
  return promise
}

export {
  DatabaseGetLabels,
  DatabaseGetLabelNames,
  DatabaseUpdateLabelNames
};
