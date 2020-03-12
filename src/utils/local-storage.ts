/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IO } from 'fp-ts/es6/IO'
import { IOEither, tryCatch } from 'fp-ts/es6/IOEither'
import { Option, fromNullable } from 'fp-ts/es6/Option'

export function getItem(key: string): IO<Option<string>> {
  return () => fromNullable(window.localStorage.getItem(key))
}

export function setItem(key: string, value: string): IOEither<Error, void> {
  return tryCatch(
    () => window.localStorage.setItem(key, value),
    reason => new Error(String(reason))
  )
}

export function clear(): IO<void> {
  return () => window.localStorage.clear()
}
