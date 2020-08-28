import { App } from "./App.model"
import { Label } from "./Label.model"

export const LabelsToKeyedData = (labels: Label[]) => {
  let data: KeyedData = {}
  for (let label of labels)
    data = { ...data, [label.id]: label }
  return data
}

export const AppsToKeyedData = (apps: App[]) => {
  let data: KeyedData = {}
  for (let app of apps)
    data = { ...data, [app.id]: app }
  return data
}

export interface KeyedData {
  [id: string]: object
}