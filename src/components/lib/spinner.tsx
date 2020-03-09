import { css, keyframes } from 'emotion/macro'
import React from 'react'
import { IconBaseProps } from 'react-icons'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export function Spinner(props: IconBaseProps): JSX.Element {
  return (
    <FaSpinner
      className={css`
        animation: ${spin} 1s linear infinite;
      `}
      aria-label="loading"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}
