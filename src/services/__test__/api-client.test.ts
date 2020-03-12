/* eslint-disable jest/no-hooks */
/* eslint-disable no-magic-numbers */
import { client } from '../api-client.service'

import { apiUrl, localStorageTokenKey } from 'config'

describe('api-client', () => {
  let fetchMock:
    | jest.SpyInstance<Promise<Response>, [RequestInfo, RequestInit?]>
    | undefined

  beforeEach(() => {
    fetchMock = jest.spyOn(window, 'fetch')
  })

  afterEach(() => {
    if (fetchMock) fetchMock.mockRestore()
  })

  const url = (endpoint: string): string => `${apiUrl}/${endpoint}`

  const responseMock: Response = new Response()

  it('calls fetch at the endpoint with the arguments for GET requests', () => {
    expect.assertions(2)

    // arrange:
    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(),
      })
    const { signal } = new AbortController()

    // act:
    client('foo')

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith(url('foo'), {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
      signal,
    })
  })

  it('adds auth token when a token is in localStorage', () => {
    expect.assertions(2)
    // arrange
    window.localStorage.setItem(localStorageTokenKey, 'FAKE_TOKEN')

    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(),
      })
    const { signal } = new AbortController()

    // act:
    client('foo')

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith(url('foo'), {
      headers: {
        Authorization: 'Bearer FAKE_TOKEN',
        'content-type': 'application/json',
      },
      method: 'GET',
      signal,
    })

    // clean up:
    window.localStorage.removeItem(localStorageTokenKey)
  })

  it('allows for config overrides', () => {
    // arrange:
    expect.assertions(2)
    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(),
      })

    const { signal } = new AbortController()

    // act:
    client('foo', {
      credentials: 'omit',
      headers: { 'content-type': 'fake-type' },
      mode: 'no-cors',
      signal,
    })

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith(url('foo'), {
      credentials: 'omit',
      headers: { 'content-type': 'fake-type' },
      method: 'GET',
      mode: 'no-cors',
      signal,
    })
  })
})
