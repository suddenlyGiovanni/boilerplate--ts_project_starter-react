import React, { ReactElement, ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from 'store'

interface Props {
  children?: ReactNode
}
export function AppProviders({ children }: Props): ReactElement {
  return <ReduxProvider store={store}>{children}</ReduxProvider>
}
