import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { duckActions, duckSelectors } from 'features/duck'

export function useDuckState(): { quacking: boolean; distance: number } {
  const quacking: boolean = useSelector(duckSelectors.checkIfDuckIsQuaking)
  const distance: number = useSelector(duckSelectors.duckDistance)
  return {
    quacking,
    distance,
  }
}

export function useDuckDispatch() {
  const dispatch = useDispatch()
  const quack = useCallback(() => {
    return dispatch(duckActions.quack())
  }, [dispatch])

  const swim = useCallback(
    (distance: number) => {
      return dispatch(duckActions.swim(distance))
    },
    [dispatch]
  )

  const fetchDucks = useCallback(() => {
    return dispatch(duckActions.fetchDucks())
  }, [dispatch])

  return {
    quack,
    swim,
    fetchDucks,
  }
}
