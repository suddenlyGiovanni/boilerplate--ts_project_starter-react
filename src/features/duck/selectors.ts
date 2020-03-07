/**
 * @description Selectors
 * In case your state shape is more complex you need selectors in order to map parts of the`state`
 * to your`props` or in order to derive some data for your components from the current state.
 *
 * These are the functions like: `getVisibleTodos`, `isUserAuthenticated`, etc.that take the
 * current app state and return some derived data.
 *
 * NOTE: Selector functions will be used outside the duck folder, so they are part of the
 * ** interface ** of the duck.
 */

import { RootState } from 'typesafe-actions'

const BASE_DISTANCE = 1000

export const checkIfDuckIsInRange = (state: RootState): boolean =>
  state.duck.distance > BASE_DISTANCE

export const checkIfDuckIsQuaking = (state: RootState): boolean =>
  state.duck.quacking

export const duckDistance = (state: RootState): number => state.duck.distance
