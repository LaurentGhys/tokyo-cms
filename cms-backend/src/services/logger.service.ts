
export class Logger {
  static ApiRequest = (name: string, url: string, requestData?: any) => {
    console.log(`
[API REQUEST] '${url}' => ${name}
  - Request Data:
`)
    console.log(requestData)
  }

  static ApiResponse = (name: string, url: string, responseData?: any) => {
    console.log(`
[API RESPONSE] '${url}' => ${name}
  - Reponse Data:
  `)
    console.log(responseData)
  }
  static ApiTrace = (name: string, url: string, requestData: any, reponseError: any, reponseData: any) => {
    const response = reponseError != null ? reponseError : reponseData

    console.log(`
[API REQUEST] '${url}' => ${name}
  
  - Request Data:`)
    console.log(requestData)
    console.log(`
  - Reponse Data:`)
    console.log(response)
  }
}