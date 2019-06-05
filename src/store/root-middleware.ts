import { getDefaultMiddleware } from 'redux-starter-kit'

import { actionSplitter } from './action-splitter-middleware'
import { apiMiddleware } from 'features/api'
import { duckMiddleware } from 'features/duck'

const rootMiddleware = [
  ...getDefaultMiddleware(),
  actionSplitter,
  duckMiddleware,
  apiMiddleware,
]

if (process.env.NODE_ENV === 'development') {
  rootMiddleware.push(require('redux-logger').default)
}

export default rootMiddleware
