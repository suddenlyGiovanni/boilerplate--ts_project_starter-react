import React, { Suspense, lazy } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

import { elementContainer, homeWrapper, listElement } from './home.styles'

import { Header } from 'views/home/header/header.view'
import { Main } from 'views/home/main/main.view'

const Duck = lazy(() => import('components/duck/duck.component'))
const Other = lazy(() => import('components/other/other.component'))
export function Home(): JSX.Element {
  return (
    <div className={homeWrapper}>
      <Header />
      <Main>
        <ul className={elementContainer}>
          <li className={listElement}>
            <NavLink to="duck">{'Duck'}</NavLink>
          </li>

          <li className={listElement}>
            <NavLink to="other">{'Other'}</NavLink>
          </li>
        </ul>
        <Suspense fallback={<div>{'Loading...'}</div>}>
          <Routes>
            <Route path="duck" element={<Duck />} />
            <Route path="other" element={<Other />} />
          </Routes>
        </Suspense>
      </Main>
    </div>
  )
}
