import * as React from 'react'
import css from '@emotion/css/macro'

const mainStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

export const Main: React.FC = ({ children }) => (
  <div css={mainStyle}>{children}</div>
)
