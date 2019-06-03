import { createAction } from 'typesafe-actions'
import apiTypes from './types'

import { AxiosError } from 'axios'

export const apiStart = createAction(apiTypes.API_START, action => {
  return (label: string) => action({ label })
})

export const apiEnd = createAction(apiTypes.API_END, action => {
  return (label: string) => action({ label })
})

export const accessDenied = createAction(apiTypes.ACCESS_DENIED, action => {
  return (pathname: string) => action({ pathname })
})

export const apiError = createAction(apiTypes.API_ERROR, action => {
  return (error: AxiosError) => action({ error })
})
