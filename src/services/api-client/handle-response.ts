export enum ResponseType {
  json = 'json',
  text = 'text',
  blob = 'blob',
}

type ReturnValue<T> = {
  body: T
  headers: HeadersDictionary
  response: Response
  status: number
  statusText: string
}

type HeadersDictionary = { [header: string]: string }

function handleResponse<R>(response: Response): Promise<ReturnValue<R>> {
  const type = response.headers.get('content-type')
  if (type?.includes(ResponseType.json)) {
    return parseResponse(response, ResponseType.json)
  }
  if (type?.includes(ResponseType.text)) {
    return parseResponse(response, ResponseType.text)
  }
  if (type?.includes(ResponseType.blob)) {
    return parseResponse(response, ResponseType.blob)
  }

  // Need to check for FormData, Blob and ArrayBuffer content types
  throw new Error(`does not support content-type ${type}`)
}

function parseResponse<R>(
  response: Response,
  type: ResponseType
): Promise<ReturnValue<R>> {
  const clone =
    typeof response.clone === 'function' ? response.clone() : undefined

  const passedResponse = clone || response

  return response[type]().then(body => formatOutput<R>(passedResponse, body))
}

function formatOutput<R>(response: Response, body: R): Promise<ReturnValue<R>> {
  const headers = getHeaders(response)
  const returnValue = {
    body,
    headers,
    response,
    status: response.status,
    statusText: response.statusText,
  }

  return response.ok
    ? Promise.resolve(returnValue)
    : Promise.reject(returnValue)
}

function getHeaders(response: Response): HeadersDictionary {
  const headers: HeadersDictionary = {}
  // eslint-disable-next-line no-restricted-syntax
  for (const [header, value] of response.headers) {
    headers[header] = value
  }
  return headers
}

export default {
  formatOutput,
  handleResponse,
  parseResponse,
}
