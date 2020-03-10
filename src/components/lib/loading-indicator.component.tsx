import React from 'react'

interface Props<TestId extends string = string> {
  testId?: TestId
}
export function LoadingIndicator<TestId extends string = string>(
  props: Props<TestId>
): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const testId = props.testId ?? 'loading-indicator'
  return <div data-testid={testId}>{'Loading...'}</div>
}
