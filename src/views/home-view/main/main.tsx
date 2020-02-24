import css from '@emotion/css/macro'
import React from 'react'

const mainStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Main: React.FC = ({ children }) => {
  return <div css={mainStyle}>{children}</div>
}
