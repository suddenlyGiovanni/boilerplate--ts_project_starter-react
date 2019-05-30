import { combineReducers } from 'redux-starter-kit'

import { duckReducer } from 'features/example-feature'

export const rootReducer = combineReducers({
  ducks: duckReducer,
  // ...
})
