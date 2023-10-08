import './globals.css'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '../lib/AntdRegistry'

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
