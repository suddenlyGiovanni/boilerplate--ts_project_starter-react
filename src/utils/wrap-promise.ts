export function wrapPromise<T>(promise: Promise<T>): { read(): T | undefined } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Reason<T extends any = any> = T
  enum Status {
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
  }

  let status: Status = Status.Pending
  let result: T
  let error: Reason
  function onfulfilled(value: T): void {
    status = Status.Success
    result = value
  }
  function onrejected<U>(reason: Reason<U>): void {
    status = Status.Error
    error = reason
  }

  const suspender: Promise<void> = promise.then(onfulfilled, onrejected)

  return {
    // eslint-disable-next-line consistent-return
    read(): T | undefined {
      switch (status) {
        case Status.Pending: {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw suspender
        }

        case Status.Error: {
          throw error
        }

        case Status.Success: {
          return result
        }
      }
    },
  }
}
