import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from 'store'
import 'styles/index.css'
import { Home } from 'views/home-view/Home'
import * as serviceWorker from './serviceWorker'



const rootElement = document.getElementById('root')

const Root = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <StrictMode>
    <Root />
  </StrictMode>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
