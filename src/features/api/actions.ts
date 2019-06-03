import * as axios from 'axios'
import cuid from 'cuid'

import { createAction } from 'typesafe-actions'
import apiTypes from './types'

import { AxiosError } from 'axios'

export const apiStart = createAction(apiTypes.API_START, action => {
  return ({
    feature,
    timestamp,
    cuid,
  }: {
    feature: string
    cuid: string
    timestamp: number
  }) => {
    return action({ timestamp }, { cuid, feature })
  }
})

export const apiEnd = createAction(apiTypes.API_END, action => {
  return ({
    feature,
    timestamp,
    cuid,
  }: {
    feature: string
    cuid: string
    timestamp: number
  }) => {
    return action({ timestamp }, { cuid, feature })
  }
})

export const accessDenied = createAction(apiTypes.ACCESS_DENIED, action => {
  return ({
    pathname,
    feature,
    cuid,
  }: {
    pathname: string
    feature: string
    cuid: string
  }) => action({ pathname }, { cuid, feature })
})

interface ApiActionFactory extends axios.AxiosRequestConfig {
  feature: string
  accessToken?: null | string
}

export const apiRequest = createAction(apiTypes.API_REQUEST, action => {
  return ({
    url = '',
    method = 'GET',
    data = null,
    feature = '',
    accessToken = null,
    ...rest
  }: ApiActionFactory) => {
    return action(
      { url, method, data, accessToken, ...rest },
      { cuid: cuid(), feature }
    )
  }
})

export const apiSuccess = createAction(apiTypes.API_SUCCESS, action => {
  return function<T = {}>({
    feature,
    data,
    cuid,
  }: {
    feature: string
    data: T
    cuid: string
  }) {
    return action({ data }, { cuid, feature })
  }
})

export const apiError = createAction(apiTypes.API_ERROR, action => {
  return ({
    feature,
    error,
    cuid,
  }: {
    feature: string
    error: AxiosError
    cuid: string
  }) => action({ error }, { cuid, feature })
})
