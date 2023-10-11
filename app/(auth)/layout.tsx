import React from 'react'
import { Content } from 'antd/es/layout/layout'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Content
      className="flex justify-center items-center w-screen"
      style={{ height: '100vh' }}
    >
      {children}
    </Content>
  )
}
