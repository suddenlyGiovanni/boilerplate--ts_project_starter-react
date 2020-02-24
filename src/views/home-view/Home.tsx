import styled from '@emotion/styled/macro'
import { Duck } from "components/duck/Duck"
import React from 'react'
import { RouteChildrenProps } from 'react-router'
import { NavLink, Route, Switch } from 'react-router-dom'
import { Header } from 'views/home-view/header/Header'
import { Main } from 'views/home-view/main/Main'




const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  align-items: center;
`

const ElementContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin-block-start: unset;
  margin-block-end: unset;
  margin-inline-start: unset;
  margin-inline-end: unset;
  padding-inline-start: unset;
`

const ListElement = styled.li`
  margin: 10px 10px;
`

export const Home: React.FC<RouteChildrenProps> = () => {
  return (
    <HomeWrapper>
      <Header />
      <Main>
        <ElementContainer>
          <ListElement>
            <NavLink to="/duck">Duck</NavLink>
          </ListElement>

          <ListElement>
            <NavLink to="/other">Other</NavLink>
          </ListElement>
        </ElementContainer>
        <Switch>
          <Route path="/duck" component={Duck} />
        </Switch>
      </Main>
    </HomeWrapper>
  )
}
