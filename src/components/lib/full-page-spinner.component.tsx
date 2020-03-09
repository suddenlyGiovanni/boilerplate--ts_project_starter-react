import { css } from 'emotion/macro'
import React from 'react'

import { Spinner } from 'components/lib'

export function FullPageSpinner(): JSX.Element {
  return (
    <div
      className={css`
        margin-top: 3em;
        font-size: 4em;
      `}
    >
      <Spinner />
    </div>
  )
}
