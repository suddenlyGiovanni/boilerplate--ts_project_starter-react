import { createAction } from 'typesafe-actions'

/*
 * ### Actions
 * It's important to be consistent when defining actions, so let's always export functions from
 * this file, we don't care if the action needs any input from the outside to build the payload
 * or not.
 * NOTE: Trying to impose a bit of structure to the actions object, the`type/payload` approach is
 * pretty popular.
 */

export const quack = createAction('@duck/QUACK')

export const swim = createAction('@duck/SWIM', action => {
  return (distance: number) => action({ distance })
})

export type DuckActionTypes = ReturnType<typeof quack> | ReturnType<typeof swim>
