import * as React from 'react'

import { ConnectedProps } from './AppConnected'

import logo from 'assets/logo.svg'
import './App.css'

export type Props = ConnectedProps
export const App: React.FC<Props> = props => {
  const { quaking, distance, quack, swim } = props

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h3>Feature: Duck</h3>
        <p>
          is quaking: {`${quaking}`}
          <button onClick={() => quack()}>Toggle quaking</button>
        </p>
        <p>
          swimming distance: {distance}
          <button onClick={() => swim(100)}>add 100</button>
        </p>
      </div>
    </div>
  )
}
