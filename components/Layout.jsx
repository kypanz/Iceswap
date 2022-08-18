import React from 'react'

import Menu from '../components/Menu';

export default function Layout({ children }) {
  return (
    <div>
        <Menu />
        {children}
    </div>
  )
}
