import { apiUrl, localStorageTokenKey } from 'config'

/**
 * HTTP Methods for RESTful Services
 *
 *  | HTTP Verb | CRUD  | Entire Collection (/customers) | Specific Item (/customers/{id}) |
 *  | -------------------- | -------------------- | --------------------  | ---------------------- |
 *  | POST  | Create  | 201 (Created), 'Location' header with link to /customers/{id} containing new ID  | 404 (Not Found), 409 (Conflict) if resource already exists..  |
 *  | GET  | Read  | 200 (OK), list of customers  | 200 (OK), single customer. 404 (Not Found), if ID not found or invalid.  |
 *  | PUT  | Update/Replace | 405 (Method Not Allowed)  | 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.  |
 *  | PATCH  | Update/Modify  | 405 (Method Not Allowed)  | 200 (OK) or 204 (No Content). 404 (Not Found), if ID not found or invalid.  |
 *  | DELETE  | Delete  | 405 (Method Not Allowed)  | 200 (OK). 404 (Not Found), if ID not found or invalid.  |
 */

export enum HttpVerb {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Config = Omit<RequestInit, 'body'> & { body?: unknown }
type Abort = () => void

export async function client<T>(
  endpoint: string,
  requestInit?: Config
): Promise<[T, Abort]> {
  const [config, controller] = configRequestInit(requestInit)
  const url = `${apiUrl}/${endpoint}`

  const response = await window.fetch(url, config)
  const data = await response.json()
  // const promise = window.fetch(url, config).then<T>(response => response.json())
  const abort = controller.abort.bind(controller)
  return [data, abort]
}

function configRequestInit({ body, headers, ...customConfig }: Config = {}): [
  RequestInit,
  AbortController
] {
  const token = window.localStorage.getItem(localStorageTokenKey)
  const methodInit = body ? HttpVerb.POST : HttpVerb.GET

  const controller = new AbortController()
  const abortSignal: AbortSignal = controller.signal

  const headersInit = {
    'content-type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  }

  const bodyInit: BodyInit | undefined = body ? JSON.stringify(body) : undefined

  const config = {
    body: bodyInit,
    headers: headersInit,
    method: methodInit,
    signal: abortSignal,
    ...customConfig,
  }

  return [config, controller]
}
