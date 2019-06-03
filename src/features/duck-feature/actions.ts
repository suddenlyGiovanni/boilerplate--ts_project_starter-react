/* eslint-disable no-console */
import { createAction } from 'typesafe-actions'

import duckTypes from './types'
import { apiActionFactory } from 'store/api/api-utils'

/*
 * ### Actions
 * It's important to be consistent when defining actions, so let's always export functions from
 * this file, we don't care if the action needs any input from the outside to build the payload
 * or not.
 * NOTE: Trying to impose a bit of structure to the actions object, the`type/payload` approach is
 * pretty popular.
 */

export const quack = createAction(duckTypes.QUACK)

export const swim = createAction(duckTypes.SWIM, action => {
  return (distance: number) => action({ distance })
})

export function fetchDucks() {
  return apiActionFactory({
    baseURL: 'https://4cacf9e9-faef-4017-a283-0fe1fb2974c4.mock.pstmn.io/',
    url: '/get',
    method: 'GET',
    onSuccess: data => console.log('success: ', data),
    onFailure: error => console.log('Error occurred loading ducks: ', error),
    label: duckTypes.FETCH_DUCKS,
  })
}

export type DuckActionTypes =
  | ReturnType<typeof quack>
  | ReturnType<typeof swim>
  | ReturnType<typeof fetchDucks>
