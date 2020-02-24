import { useDuckDispatch, useDuckState } from 'features/duck'
import React, { memo, useCallback } from 'react'

export const Duck = memo(function Duck():JSX.Element {
  const { distance, quacking } = useDuckState()
  const { fetchDucks, quack, swim } = useDuckDispatch()

  const onClickAdd = useCallback(() => swim(100),[swim])
  return (
    <div>
      <h3>Feature: Duck</h3>
      <p>
        is quacking: {`${quacking}`}
        <button onClick={quack}>Toggle quacking</button>
      </p>
      <p>
        swimming distance: {distance}
        <button onClick={onClickAdd}>add 100</button>
      </p>
      <p>
        <button onClick={fetchDucks}>Fetch ducks</button>
      </p>
    </div>
  )
})
