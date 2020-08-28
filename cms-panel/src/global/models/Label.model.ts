
export class Label {
  id: string
  name?: string
  values?: Object[]
  constructor(label: any = {}) {
    this.id = label.id
    this.name = label.name
    this.values = label.values || {}
    if (label.languages != null && label.languages != []) {
      for (let lang of label.languages) {
        this.values = {
          ...this.values,
          [lang]: ''
        }
      }
    }
  }
}