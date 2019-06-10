import * as React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

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

export const Header: React.FC = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <Logo src={logo} alt="logo" />
      <EditCopy>
        Edit <code>src/views/home-view/home</code> and save to reload.
      </EditCopy>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Link>
    </HeaderContainer>
  </HeaderWrapper>
)
