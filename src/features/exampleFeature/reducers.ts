/**
 * @description Reducers
 * It's a good practice to keep your **state shape** in a comment above the reducers, just to have
 * an overview.
 *
 * In case the state shape is more complex, you should break the reducers into multiple smaller
 * functions that deal with a slice of the state, then combine them at the end.
 *
 * NOTE: Let's keep it simple for now with `switch` statements and abstract later.
 */

import { QUACK, SWIM } from './types'

export interface DuckState {
  readonly quacking: boolean
  readonly distance: number
}

const initialState: DuckState = {
  quacking: false,
  distance: 0,
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function reducer(state: DuckState = initialState, action: any) {
  switch (action.type) {
    case QUACK: {
      return { ...state, quacking: true }
    }

    case SWIM: {
      const distance = action.payload
      return { ...state, distance: state.distance + distance }
    }

    default: {
      return state
    }
  }
}
