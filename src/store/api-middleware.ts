import axios, { AxiosError } from 'axios'
import { Middleware, Dispatch } from 'redux'
import { RootState, RootAction } from 'typesafe-actions'

import apiActionTypes from 'store/api/types'
import * as apiActions from 'store/api/actions'

export const apiMiddleware: Middleware<{}, RootState, Dispatch<RootAction>> = ({
  dispatch,
}) => (next: Dispatch<RootAction>) => action => {
  next(action)

  if (action.type !== apiActionTypes.API) return undefined

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers,
  } = action.payload

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data'

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Authorization'] = `Bearer${accessToken}`

  if (label) {
    dispatch(apiActions.apiStart(label))
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({ data }) => {
      dispatch(onSuccess(data))
    })
    .catch((error: AxiosError) => {
      dispatch(apiActions.apiError(error))
      dispatch(onFailure(error))

      if (error.response && error.response.status === 403) {
        dispatch(apiActions.accessDenied(window.location.pathname))
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiActions.apiEnd(label))
      }
    })
}
