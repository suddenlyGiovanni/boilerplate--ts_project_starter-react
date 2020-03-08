import React, { memo, useCallback } from 'react'

import * as styles from './duck.styles'

import { useDuckDispatch, useDuckState } from 'features/duck'

export default memo(function Duck(): JSX.Element {
  const { distance, quacking } = useDuckState()
  const { fetchDucks, quack, swim } = useDuckDispatch()

  const DISTANCE = 100
  const onClickAdd = useCallback(() => swim(DISTANCE), [swim])
  return (
    <div>
      <h3>{'Feature: Duck'}</h3>
      <p>
        {`is quacking: `}
        <span className={styles.temporary}>{String(quacking)}</span>
        <button onClick={quack} type="button">
          {'Toggle quacking'}
        </button>
      </p>
      <p>
        {`swimming distance: `}
        <span className={styles.temporary}>{distance}</span>
        <button onClick={onClickAdd} type="button">
          {'add 100'}
        </button>
      </p>
      <p>
        <button onClick={fetchDucks} type="button">
          {'Fetch ducks'}
        </button>
      </p>
    </div>
  )
})
