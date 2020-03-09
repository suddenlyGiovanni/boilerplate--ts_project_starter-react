import { render } from '@testing-library/react'
import React from 'react'

import { Header } from './header.view'

describe('app', () => {
  it('renders `Learn React`', () => {
    expect.assertions(1)
    const { getByText } = render(<Header />)
    expect(getByText('Learn React')).toBeInTheDocument()
  })
})
