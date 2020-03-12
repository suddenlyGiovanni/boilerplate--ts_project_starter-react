import { Either, tryCatch } from 'fp-ts/es6/Either'

export function stringify(value: unknown): Either<Error, string> {
  return tryCatch(
    () => JSON.stringify(value),
    error => (error instanceof Error ? error : new Error(String(error)))
  )
}

export function parse(string: string): Either<Error, unknown> {
  return tryCatch(
    () => JSON.parse(string),
    error => (error instanceof Error ? error : new Error(String(error)))
  )
}
