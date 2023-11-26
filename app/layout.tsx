import './globals.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import { Layout } from 'antd'

export const metadata: Metadata = {
  title: 'Auth app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className="h-full">
        <StyledComponentsRegistry>
          <Layout
            className="h-full"
            hasSider={true}
          >
            {children}
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
