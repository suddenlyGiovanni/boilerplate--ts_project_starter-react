import axios, { AxiosError } from 'axios'
import { Middleware, Dispatch } from 'redux'
import { RootState, RootAction } from 'typesafe-actions'

import apiActionTypes from './types'
import * as apiActions from './actions'

export const apiMiddleware: Middleware<{}, RootState, Dispatch<RootAction>> = ({
  dispatch,
}) => next => action => {
  next(action)

  if (action.type === apiActionTypes.API_REQUEST) {
    const { url, method, data, accessToken, headers, ...rest } = action.payload
    const { feature, cuid } = action.meta

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data'

    // axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Authorization'] = `Bearer${accessToken}`

    dispatch(apiActions.apiStart({ feature, cuid, timestamp: Date.now() }))

    axios
      .request({
        url,
        method,
        headers,
        [dataOrParams]: data,
        ...rest,
      })
      .then(({ data }) => {
        dispatch(apiActions.apiSuccess({ data, feature, cuid }))
      })
      .catch((error: AxiosError) => {
        dispatch(apiActions.apiError({ error, feature, cuid }))

        if (error.response && error.response.status === 403) {
          dispatch(
            apiActions.accessDenied({
              pathname: window.location.pathname,
              feature,
              cuid,
            })
          )
        }
      })
      .finally(() => {
        dispatch(apiActions.apiEnd({ feature, cuid, timestamp: Date.now() }))
      })
  }
}
