import { RootState } from 'typesafe-actions'

import { DucksState } from './reducer'

import {
  duckActions as actions,
  duckReducer as reducer,
  duckSelectors as selectors,
  duckTypes as types,
} from '.'

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<DucksState>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return reducer(initial as DucksState, {} as any)
}

const getRootState = (initial?: Partial<DucksState>): RootState => ({
  duck: getInitialState(initial),
})

describe('feature: `duck`', () => {
  describe('actions', () => {
    it('should create an action to make a duck quack', () => {
      expect.hasAssertions()
      const expectedAction = { type: types.QUACK }
      expect(actions.quack()).toStrictEqual(expectedAction)
    })

    it('should create an action to make a duck swim', () => {
      expect.hasAssertions()
      const distance = 100
      const expectedAction = { type: types.SWIM, payload: { distance } }
      expect(actions.swim(distance)).toStrictEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    describe('initial state', () => {
      it('should match a snapshot', () => {
        expect.hasAssertions()
        const initialState = getInitialState()
        expect(initialState).toMatchInlineSnapshot(`
          Object {
            "distance": 0,
            "quacking": false,
          }
        `)
      })
    })

    describe('toggling `quack`', () => {
      const initialState = getInitialState()
      const state1 = reducer(initialState, actions.quack())
      const state2 = reducer(state1, actions.quack())

      it('the initial state of quacking should be `false`', () => {
        expect.hasAssertions()
        expect(initialState.quacking).toBe(false)
      })

      it('should toggle `quacking` from `false` to `true`', () => {
        expect.hasAssertions()
        expect(state1.quacking).toBe(true)
      })

      it('should toggle `quacking` from `true` to `false`', () => {
        expect.hasAssertions()
        expect(state2.quacking).toBe(false)
      })
    })

    describe('swimming', () => {
      it('should `sum` the `initial` distance `to` the `new` swam `distance`', () => {
        expect.hasAssertions()
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

  describe('selectors', () => {
    const initialRootState = getRootState()

    it('checkIfDuckIsInRange', () => {
      expect.hasAssertions()
      const state1 = getInitialState({ distance: 1001 })
      const rootState1 = getRootState(state1)

      expect(selectors.checkIfDuckIsInRange(initialRootState)).toBe(false)
      expect(selectors.checkIfDuckIsInRange(rootState1)).toBe(true)
    })

    it('checkIfDuckIsQuaking', () => {
      expect.hasAssertions()
      expect(selectors.checkIfDuckIsQuaking(initialRootState)).toBe(false)
      const state1 = getInitialState({ quacking: true })
      const rootState1 = getRootState(state1)
      expect(selectors.checkIfDuckIsQuaking(rootState1)).toBe(true)
    })

    it('duckDistance', () => {
      expect.hasAssertions()
      const distance = 100
      expect(selectors.duckDistance(initialRootState)).toBe(0)
      expect(
        selectors.duckDistance(getRootState(getInitialState({ distance })))
      ).toBe(distance)
    })
  })
})
