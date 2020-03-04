/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, Middleware } from 'redux'
import { RootAction, RootState } from 'typesafe-actions'

export const actionSplitter: Middleware<
  {},
  RootState,
  Dispatch<RootAction>
> = () => next => (action: any): any => {
  if (Array.isArray(action)) {
    action.forEach(_action => next(_action))
  } else {
    // eslint-disable-next-line callback-return
    next(action)
  }
}
