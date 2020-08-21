import { App } from '../models/App.model';
import { ApiDelete, ApiGet, ApiPost, ApiPut, DatabaseResponse } from './Api.service';

const DatabaseNewApp = (app: App): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiPost('app', app)
      .then(res => {
        resolve({
          title: 'New app success',
          message: 'Created successfully',
          data: res
        })
      })
      .catch(err => {
        reject({
          title: 'New app failed',
          message: 'Creation failed',
          data: err
        })
      })
  })
  return promise
}

const DatabaseUpdateApp = (app: App): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiPut('app', app)
      .then(res => {
        resolve({
          title: 'Getting app success',
          message: 'Success',
          data: new App(res.data)
        })
      })
      .catch(err => {
        reject({
          title: 'Getting app failed',
          message: 'Getter failed',
          data: err
        })
      })
  })
  return promise
}

const DatabaseDeleteApp = (appId): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiDelete('app', { appId: appId })
      .then(res => {
        resolve({
          title: 'Getting app success',
          message: 'Success',
          data: new App(res.data)
        })
      })
      .catch(err => {
        reject({
          title: 'Getting app failed',
          message: 'Getter failed',
          data: err
        })
      })
  })
  return promise
}

const DatabaseGetApp = (appId): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiGet('app', { appId: appId })
      .then(res => {
        resolve({
          title: 'Getting app success',
          message: 'Success',
          data: new App(res.data)
        })
      })
      .catch(err => {
        reject({
          title: 'Getting app failed',
          message: 'Getter failed',
          data: err
        })
      })
  })
  return promise
}

const DatabaseGetApps = (): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    ApiGet('apps')
      .then(res => {
        resolve({
          title: 'Getting apps success',
          message: 'Success',
          data: res.data
        })
      })
      .catch(err => {
        reject({
          title: 'Getting apps failed',
          message: 'Getter failed',
          data: err
        })
      })
  })
  return promise
}

export {
  DatabaseNewApp,
  DatabaseUpdateApp,
  DatabaseDeleteApp,
  DatabaseGetApp,
  DatabaseGetApps,
  DatabaseResponse
};

