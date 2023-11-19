'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { Menu, MenuProps } from 'antd'
import { TUser } from '@/types/user'

let items: Exclude<MenuProps['items'], undefined> = [
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'Admin',
    key: '/admin'
  }
]

export function SiderMenu({ user }: { user: TUser }) {
  const router = useRouter()
  const path = usePathname()

  if (!user.isAdmin) {
    items = items.filter((item) => {
      return item?.key !== '/admin'
    })
  }

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
