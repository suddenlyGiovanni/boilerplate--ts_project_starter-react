/**
 * ### Actions
 * It's important to be consistent when defining actions, so let's always export functions from
 * this file, we don't care if the action needs any input from the outside to build the payload
 * or not.
 * NOTE: Trying to impose a bit of structure to the actions object, the`type/payload` approach is
 * pretty popular.
 */

import * as types from './types'

interface QuackAction {
  type: typeof types.QUACK
}

export function quack(): QuackAction {
  return { type: types.QUACK }
}

interface SwimAction {
  type: typeof types.SWIM
  payload: number
}

export function swim(distance: number): SwimAction {
  return {
    type: types.SWIM,
    payload: distance,
  }
}

export type DuckActionTypes = QuackAction | SwimAction
