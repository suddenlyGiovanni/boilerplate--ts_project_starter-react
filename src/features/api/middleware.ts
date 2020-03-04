/* eslint-disable max-statements */
/* eslint-disable callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { AnyAction, Dispatch, Middleware } from 'redux'
import { RootAction, RootState } from 'typesafe-actions'

import * as apiActions from './actions'
import apiActionTypes from './types'

const STATUS_CODE_FORBIDDEN = 403
export const apiMiddleware: Middleware<{}, RootState, Dispatch<RootAction>> = ({
  dispatch,
}) => next => async (action: AnyAction): Promise<any> => {
  next(action)

  if (action.type === apiActionTypes.API_REQUEST) {
    const { url, method, data, accessToken, headers, ...rest } = action.payload
    const { feature, cuid } = action.meta

    const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data'

    // Axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common.Authorization = `Bearer${accessToken}`

    dispatch(apiActions.apiStart({ cuid, feature, timestamp: Date.now() }))

    try {
      const response = await axios.request({
        [dataOrParams]: data,
        headers,
        method,
        url,
        ...rest,
      })

      dispatch(apiActions.api.success({ cuid, data: response.data, feature }))
    } catch (error) {
      dispatch(apiActions.api.failure({ cuid, error, feature }))

      if (error.response && error.response.status === STATUS_CODE_FORBIDDEN) {
        dispatch(
          apiActions.accessDenied({
            cuid,
            feature,
            pathname: window.location.pathname,
          })
        )
      }
    } finally {
      dispatch(apiActions.apiEnd({ cuid, feature, timestamp: Date.now() }))
    }
  }
}
