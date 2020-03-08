/* eslint-disable import/no-extraneous-dependencies */
import {
  RenderOptions,
  RenderResult,
  render,
  wait,
} from '@testing-library/react'
import { LocationState, MemoryHistory, createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithRouter = <T extends any>(
  ui: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'queries'> & { route: string }
): RenderResult & {
  finishLoading: () => Promise<void>
  history: MemoryHistory<LocationState>
} => {
  const { route, ...renderOptions } = options || { route: '/' }
  const history = createMemoryHistory({ initialEntries: [route] })
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)

  const finishLoading = (): Promise<void> => {
    return wait(() => expect(utils.queryByText('Loading')).toBeNull())
  }

  return { ...utils, finishLoading, history }
}

export { wait, render, cleanup, fireEvent } from '@testing-library/react'
export { renderWithRouter }
