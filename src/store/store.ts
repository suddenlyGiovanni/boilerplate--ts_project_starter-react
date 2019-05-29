import { configureStore } from 'redux-starter-kit'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  /**
   * A single reducer function that will be used as the root reducer,
   * or an object of slice reducers that will be passed to combineReducers()
   */
  reducer: rootReducer,
  /** An array of Redux middlewares.  If not supplied, uses getDefaultMiddleware() */
  // middleware?: [thunk, logger],

  /** Enable support for the Redux DevTools Extension. Defaults to true. */
  devTools: true,

  /** Same as current createStore. */
  // preloadedState?: State,

  /** An optional array of Redux store enhancers */
  // enhancers?: ReduxStoreEnhancer[],
})
