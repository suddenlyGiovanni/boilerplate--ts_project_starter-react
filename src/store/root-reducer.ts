import { combineReducers } from 'redux-starter-kit'

import { duckReducer } from 'features/duck-feature'

export const rootReducer = combineReducers({
  duck: duckReducer,
  // ...
})
