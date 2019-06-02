import * as React from 'react'

export const Main: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}
