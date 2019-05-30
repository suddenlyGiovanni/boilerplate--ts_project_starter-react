import * as React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import { App, Props } from './App'


const mockInjectedProps: Props = {
  quaking: false,
  distance: 0,
  quack: () => ({type: '@duck/QUACK'}),
  swim: (distance)=> ({type:"@duck/SWIM", payload:{distance}})
}
describe('App', ()=>{

  it('renders `Learn React`', () => {
    const { getByText } = render(<App {...mockInjectedProps} />)
    expect(getByText('Learn React')).toBeInTheDocument()
  })
})
