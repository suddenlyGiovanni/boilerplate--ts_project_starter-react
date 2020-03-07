import { getDefaultMiddleware } from '@reduxjs/toolkit'

import { actionSplitter } from './action-splitter-middleware'
import { RootState } from './root-reducer'

import { apiMiddleware } from 'features/api'
import { duckMiddleware } from 'features/duck'
import { isDevelopment } from 'utils/is-development'

export const rootMiddleware = [
  ...getDefaultMiddleware<RootState>(),
  actionSplitter,
  duckMiddleware,
  apiMiddleware,
  /*
   * ...insertIf(process.env.NODE_ENV === 'development', () =>
   *   import('redux-logger')
   *     .then(module => module.default)
   *     .catch(err => {
   *       console.error(err)
   *     })
   * ),
   */
]

if (isDevelopment()) {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  rootMiddleware.push(require('redux-logger').default)
}

export type RootMiddleware = typeof rootMiddleware
