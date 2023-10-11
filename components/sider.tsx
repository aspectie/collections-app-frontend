'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { SiderProfile } from './sider-profile'

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/'
  },
  {
    label: 'Dashboard',
    key: '/dashboard'
  }
]

function CustomSider() {
  const router = useRouter()
  const path = usePathname()

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  return (
    <Sider
      trigger={null}
      className="p-2"
    >
      <Menu
        theme="dark"
        onClick={onClick}
        selectedKeys={[path]}
        mode="vertical"
        items={items}
      />
      <SiderProfile />
    </Sider>
  )
}

export default CustomSider
