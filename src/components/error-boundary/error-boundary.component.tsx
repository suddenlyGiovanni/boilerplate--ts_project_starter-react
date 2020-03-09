import React, {
  ErrorInfo,
  GetDerivedStateFromError,
  PureComponent,
  ReactNode,
} from 'react'

interface State {
  error: null | Error
}
export class ErrorBoundary extends PureComponent<undefined, State> {
  public constructor(props: undefined) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError: GetDerivedStateFromError<
    void,
    State
  > = error => {
    return { error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // log the error to the server
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  private tryAgain = (): void => this.setState({ error: null })

  public render(): ReactNode {
    const { error } = this.state
    const { children } = this.props
    return error ? (
      <div>
        {'There was an error. '}
        <button onClick={this.tryAgain} type="button">
          {'try again'}
        </button>
        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      </div>
    ) : (
      children
    )
  }
}
