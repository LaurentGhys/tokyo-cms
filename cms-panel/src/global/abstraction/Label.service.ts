// import { App } from '../models/App.model';
import { Label } from '../models/Label.model';
import { ApiPut, DatabaseResponse } from './Api.service';

const DatabaseUpdateLabels = (appId: string, labels: Label[]): Promise<DatabaseResponse> => {
  let promise = new Promise<DatabaseResponse>((resolve, reject) => {
    for (let label of labels) {
      ApiPut('label', { appId: appId, label: label })
        .catch(err => {
          reject({
            title: 'Getting app failed',
            message: 'Getter failed',
            data: err
          })
        })
    }
    resolve({
      title: 'Getting app success',
      message: 'Success',
      data: null
    })
  })
  return promise
}

export { DatabaseUpdateLabels };
