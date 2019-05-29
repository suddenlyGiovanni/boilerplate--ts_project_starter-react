import { combineReducers } from 'redux-starter-kit'

import { duckReducer } from 'features/exampleFeature'

export const rootReducer = combineReducers({
  ducks: duckReducer,
  // ...
})
