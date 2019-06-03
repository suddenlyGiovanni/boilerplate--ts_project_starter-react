import * as React from 'react'
import { DuckProps } from './index'

export const Duck: React.FC<DuckProps> = ({
  quacking,
  distance,
  quack,
  swim,
  fetchDucks,
}) => (
  <div>
    <h3>Feature: Duck</h3>
    <p>
      is quacking: {`${quacking}`}
      <button onClick={() => quack()}>Toggle quacking</button>
    </p>
    <p>
      swimming distance: {distance}
      <button onClick={() => swim(100)}>add 100</button>
    </p>
    <p>
      <button onClick={fetchDucks}>Fetch ducks</button>
    </p>
  </div>
)
