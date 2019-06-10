import * as React from 'react'
import { render } from '@testing-library/react'

import { Header } from './Header'

describe('App', () => {
  it('renders `Learn React`', () => {
    const { getByText } = render(<Header />)
    expect(getByText('Learn React')).toBeInTheDocument()
  })
})
