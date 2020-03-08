import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as serviceWorker from './serviceWorker'

import { store } from 'store'
import { isDevelopment } from 'utils/is-development'
import { Home } from 'views/home-view/home.view'

import 'styles/index.css'

const rootElement = document.querySelector('#root')

function Root(): JSX.Element {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            {/* Define here other routes */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

function renderReactOnTheDOM(): void {
  ReactDOM.render(Root(), rootElement)
}

if (isDevelopment()) {
  import('react-axe')
    .then(axe => {
      const axeTimeout = 1000
      axe.default(React, ReactDOM, axeTimeout)
      return renderReactOnTheDOM()
    })
    .catch(error =>
      // eslint-disable-next-line no-console
      console.error(
        'Oops, something went terribly wrong while importing `react-axe` lib',
        error
      )
    )
} else {
  renderReactOnTheDOM()
}

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
