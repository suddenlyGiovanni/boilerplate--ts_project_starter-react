import React, { ErrorInfo, GetDerivedStateFromError, ReactNode } from 'react'

interface State {
  error: null | Error
  hasError: boolean
}

interface Props {
  /** A fallback react tree to show when a ErrorBoundary child (like React.lazy) suspends */
  fallback: NonNullable<ReactNode> | null
}
export class ErrorBoundary extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      error: null,
      hasError: false,
    }
  }

  static getDerivedStateFromError: GetDerivedStateFromError<
    void,
    State
  > = error => {
    return { error, hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // log the error to the server
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  public render(): ReactNode {
    const { hasError } = this.state
    const { children, fallback } = this.props
    return hasError ? fallback : children
  }
}
