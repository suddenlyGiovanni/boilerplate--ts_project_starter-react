import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'

import logo from 'assets/logo.svg'

const HeaderWrapper = styled.div`
  text-align: center;
  width: 100%;
`

const Link = styled.a`
  color: #61dafb;
`

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  /* min-height: 100vh; */

  color: white;
  background-color: #282c34;

  font-size: calc(10px + 2vmin);
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  height: 40vmin;

  animation: ${rotate} infinite 20s linear;
  pointer-events: none;
`

const EditCopy = styled.p`
  color: white;
  background-color: #282c34;

  font-size: calc(10px + 2vmin);

  code {
    color: palegoldenrod;
  }
`

export function Header(): JSX.Element {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo alt="logo" src={logo} />
        <EditCopy>
          {'Edit '}
          <code>{'src/views/home-view/home'}</code>
          {' and save to reload.'}
        </EditCopy>
        <Link
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          {'Learn React'}
        </Link>
      </HeaderContainer>
    </HeaderWrapper>
  )
}
