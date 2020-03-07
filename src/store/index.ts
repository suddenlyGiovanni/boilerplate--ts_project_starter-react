import { configureStore } from '@reduxjs/toolkit'
import { RootAction, RootState } from 'typesafe-actions'

import { RootMiddleware, rootMiddleware } from './root-middleware'
import { rootReducer } from './root-reducer'

// Rehydrate state on app start
const initialState = {}

// Create store
export const store = configureStore<RootState, RootAction, RootMiddleware>({
  /** Enable support for the Redux DevTools Extension. Defaults to true. */
  devTools: process.env.NODE_ENV !== 'production',

  /** An optional array of Redux store enhancers */
  // Enhancers?: ReduxStoreEnhancer[],

  /** An array of Redux middlewares.  If not supplied, uses getDefaultMiddleware() */
  middleware: rootMiddleware,

  /** Same as current createStore. */
  preloadedState: initialState,

  /**
   * A single reducer function that will be used as the root reducer,
   * or an object of slice reducers that will be passed to combineReducers()
   */
  reducer: rootReducer,
})
