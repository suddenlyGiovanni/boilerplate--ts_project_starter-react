import {
  duckActions as actions,
  duckReducer as reducer,
  duckTypes as types,
} from '.'
import { DucksState } from './reducer'

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<DucksState>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reducer(initial as DucksState, {} as any)
}

describe('feature: `duck`', () => {
  describe('actions', () => {
    it('should create an action to make a duck quack', () => {
      const expectedAction = { type: types.QUACK }
      expect(actions.quack()).toEqual(expectedAction)
    })

    it('should create an action to make a duck swim', () => {
      const distance = 100
      const expectedAction = { type: types.SWIM, payload: { distance } }
      expect(actions.swim(distance)).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    describe('initial state', () => {
      it('should match a snapshot', () => {
        const initialState = getInitialState()
        expect(initialState).toMatchSnapshot()
      })
    })

    describe('toggling `quack`', () => {
      const initialState = getInitialState()
      const state1 = reducer(initialState, actions.quack())
      const state2 = reducer(state1, actions.quack())

      test('the initial state of quacking should be `false`', () => {
        expect(initialState.quacking).toBe(false)
      })

      it('should toggle `quacking` from `false` to `true`', () => {
        expect(state1.quacking).toBe(true)
      })

      it('should toggle `quacking` from `true` to `false`', () => {
        expect(state2.quacking).toBe(false)
      })
    })

    describe('swimming', () => {
      it('should `sum` the `initial` distance `to` the `new` swam `distance`', () => {
        const distance = 100
        const initialState = getInitialState()
        const state1 = reducer(initialState, actions.swim(distance))
        const state2 = reducer(state1, actions.swim(distance))
        expect(initialState.distance).toBe(0)
        expect(state1.distance).toBe(distance)
        expect(state2.distance).toBe(distance + distance)
      })
    })
  })
})
