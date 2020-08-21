export class App {
  id: string
  info: {
    name: string
    url: string
    urlDescription: string
    thumbnailUrl: string
  }
  cms: {
    languages: string[],
    labelIds: string[]
  }
  constructor(app: any = {}) {
    this.id = app.id
    this.info = {
      name: app.info.name,
      url: app.info.url || '',
      urlDescription: app.info.urlDescription || '',
      thumbnailUrl: app.info.thumbnailUrl || ''
    }
    this.cms = {
      languages: app.cms.languages || [],
      labelIds: app.cms.labelIds || []
    }
  }
}