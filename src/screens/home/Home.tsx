import * as React from 'react'

import { Header } from 'screens/home/header/Header'
import { Main } from 'screens/home/main/Main'
import { ConnectedDuck } from 'components/duck'
import { NavLink, Switch, Route } from 'react-router-dom'

export const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Header />
      <Main>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            listStyleType: 'none',
            marginBlockStart: 'unset',
            marginBlockEnd: 'unset',
            marginInlineStart: 'unset',
            marginInlineEnd: 'unset',
            paddingInlineStart: 'unset',
          }}
        >
          <li style={{ margin: '10px 10px' }}>
            <NavLink to="/duck">Duck</NavLink>
          </li>
          <li style={{ margin: '10px 10px' }}>
            <NavLink to="/other">Other</NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/duck" component={ConnectedDuck} />
        </Switch>
      </Main>
    </div>
  )
}
