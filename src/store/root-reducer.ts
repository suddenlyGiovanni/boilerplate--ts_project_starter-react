import { combineReducers } from 'redux-starter-kit'

import { duckReducer } from 'features/duck-feature'
import { apiReducer } from 'features/api'

export const rootReducer = combineReducers({
  duck: duckReducer,
  api: apiReducer,
  // ...
})
