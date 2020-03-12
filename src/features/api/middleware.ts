import axios from 'axios'
import { Dispatch, Middleware } from 'redux'
import { RootAction, RootState, getType } from 'typesafe-actions'

import * as apiActions from './actions'

const STATUS_CODE_FORBIDDEN = 403
export const apiMiddleware: Middleware<{}, RootState, Dispatch<RootAction>> = ({
  dispatch,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => next => async (action: RootAction): Promise<any> => {
  // eslint-disable-next-line callback-return
  next(action)

  if (action.type === getType(apiActions.api.request)) {
    const { url, method, data, accessToken, headers, ...rest } = action.payload
    const { feature, cuid } = action.meta

    const dataOrParameters = ['GET', 'DELETE'].includes(method)
      ? 'params'
      : 'data'

    // Axios default configs
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || ''
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    dispatch(apiActions.apiStart({ cuid, feature, timestamp: Date.now() }))

    try {
      const response = await axios.request({
        [dataOrParameters]: data,
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
