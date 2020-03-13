import { createRequestInit } from './create-request-init'

import { apiUrl } from 'config'

type Config = Omit<RequestInit, 'body'> & { body?: unknown }
type Abort = () => void

export async function client<T>(
  endpoint: string,
  requestInit?: Config
): Promise<[T, Abort]> {
  const url = `${apiUrl}/${endpoint}`
  const [_requestInit, controller] = createRequestInit(requestInit)
  const abort = controller.abort.bind(controller)

  const response = await window.fetch(url, _requestInit)
  const data = await response.json()
  return [data, abort]
}
