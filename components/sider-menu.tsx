'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { Menu, MenuProps } from 'antd'

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'Admin',
    key: '/admin'
  }
]

export async function SiderMenu() {
  const router = useRouter()
  const path = usePathname()

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  return (
    <Menu
      theme="dark"
      onClick={onClick}
      selectedKeys={[path]}
      mode="vertical"
      items={items}
    />
  )
}
