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
  const { signal } = new AbortController()

  it('calls fetch at the endpoint with the arguments for GET requests', () => {
    expect.assertions(2)

    // arrange:
    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(),
      })

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

    // act:
    client('bar')

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith(url('bar'), {
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

    // act:
    client('baz', {
      credentials: 'omit',
      headers: { 'content-type': 'fake-type' },
      mode: 'no-cors',
      signal,
    })

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(window.fetch).toHaveBeenCalledWith(url('baz'), {
      credentials: 'omit',
      headers: { 'content-type': 'fake-type' },
      method: 'GET',
      mode: 'no-cors',
      signal,
    })
  })

  it('returns the expected data', async () => {
    // arrange:
    expect.assertions(2)

    const responseData = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz',
    }

    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(responseData),
      })

    // act:
    const [data] = await client<typeof responseData>('letMeIn', {
      credentials: 'omit',
      headers: { 'content-type': 'fake-type' },
      mode: 'no-cors',
      signal,
    })

    // assert:
    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(data).toStrictEqual(responseData)
  })

  it('throws when not able to parse response from json', async () => {
    // arrange:
    expect.assertions(2)
    const failToParseJson = 'fail to parse body to JSON'

    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.reject(new Error(failToParseJson)),
      })

    // act:

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fn = () =>
      client('please', {
        credentials: 'omit',
        headers: { 'content-type': 'fake-type' },
        mode: 'no-cors',
        signal,
      })

    // assert:
    await expect(fn()).rejects.toThrow(failToParseJson)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  it('handles not successful responses', async () => {
    // arrange:
    expect.assertions(1)

    fetchMock &&
      fetchMock.mockResolvedValueOnce({
        ...responseMock,
        json: () => Promise.resolve(),
      })
    // act:
    // assert:
  })
})
