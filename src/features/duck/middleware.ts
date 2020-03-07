/* eslint-disable callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, Middleware } from 'redux'
import { RootAction, RootState, getType } from 'typesafe-actions'

import * as duckActions from './actions'

import { apiActions } from 'features/api'

export const duckMiddleware: Middleware<
  {},
  RootState,
  Dispatch<RootAction>
> = () => next => (action: any): any => {
  next(action)

  if (action.type === getType(duckActions.fetchDucks)) {
    next(
      apiActions.api.request({
        baseURL: 'https://4cacf9e9-faef-4017-a283-0fe1fb2974c4.mock.pstmn.io',
        feature: getType(duckActions.fetchDucks),
        method: 'GET',
        url: '/get',
      })
    )
  }

  if (
    action.meta &&
    action.meta.feature === getType(duckActions.fetchDucks) &&
    action.type === getType(apiActions.api.success)
  ) {
    next(duckActions.setDucks(action.payload))
  }
}
