import { configureStore } from 'redux-starter-kit'
import { RootAction, RootState } from 'typesafe-actions'

import { rootReducer } from './root-reducer'

import rootMiddleware from './root-middleware'
// rehydrate state on app start
const initialState = {}

// create store
export const store = configureStore<RootState, RootAction>({
  /**
   * A single reducer function that will be used as the root reducer,
   * or an object of slice reducers that will be passed to combineReducers()
   */
  reducer: rootReducer,
  /** An array of Redux middlewares.  If not supplied, uses getDefaultMiddleware() */
  middleware: rootMiddleware,

  /** Enable support for the Redux DevTools Extension. Defaults to true. */
  devTools: true,

  /** Same as current createStore. */
  preloadedState: initialState,

  /** An optional array of Redux store enhancers */
  // enhancers?: ReduxStoreEnhancer[],
})
