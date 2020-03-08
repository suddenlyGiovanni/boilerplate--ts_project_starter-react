import React from 'react'

import {
  editCopy,
  headerContainer,
  headerWrapper,
  link,
  logo,
} from './header.styles'

import reactLogo from 'assets/logo.svg'

export function Header(): JSX.Element {
  return (
    <div className={headerWrapper}>
      <header className={headerContainer}>
        <img alt="logo" className={logo} src={reactLogo} />
        <p className={editCopy}>
          {'Edit '}
          <code>{'src/views/home-view/home'}</code>
          {' and save to reload.'}
        </p>
        <a
          className={link}
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          {'Learn React'}
        </a>
      </header>
    </div>
  )
}
