import { combineReducers } from '@reduxjs/toolkit'

import { apiReducer } from 'features/api'
import { duckReducer } from 'features/duck'

export const rootReducer = combineReducers({
  api: apiReducer,
  duck: duckReducer,
  // ...
})

export type RootState = ReturnType<typeof rootReducer>
