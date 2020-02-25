import { combineReducers } from 'redux-starter-kit'

import { apiReducer } from 'features/api'
import { duckReducer } from 'features/duck'

export const rootReducer = combineReducers({
  duck: duckReducer,
  api: apiReducer,
  // ...
})
