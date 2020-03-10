import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as serviceWorker from './serviceWorker'

import { AppProviders } from 'context'
import { isDevelopment } from 'utils'
import { Home } from 'views'

import 'styles/index.css'

function Root(): JSX.Element {
  return (
    <StrictMode>
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            {/* Define here other routes */}
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </StrictMode>
  )
}

const rootElement = document.querySelector('#root')
function attachReactToTheDOM(): void {
  ReactDOM.createRoot(rootElement as Element).render(<Root />)
}

if (isDevelopment()) {
  import('react-axe')
    .then(axe => {
      const axeTimeout = 1000
      axe.default(React, ReactDOM, axeTimeout)
      return attachReactToTheDOM()
    })
    .catch(error =>
      // eslint-disable-next-line no-console
      console.error(
        'Oops, something went terribly wrong while importing `react-axe` lib',
        error
      )
    )
} else {
  attachReactToTheDOM()
}

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
