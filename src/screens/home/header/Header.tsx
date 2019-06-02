import * as React from 'react'

import logo from 'assets/logo.svg'
import './Header.css'

export const Header: React.FC = () => (
  <div className="Header">
    <header className="Header-header">
      <img src={logo} className="Header-logo" alt="logo" />
      <p>
        Edit <code>src/screens/home</code> and save to reload.
      </p>
      <a
        className="Header-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)
