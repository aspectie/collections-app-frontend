import React from 'react'
import axios from '@/lib/axios'

import { TUser } from '@/types/user'

import Sider from 'antd/es/layout/Sider'
import { SiderProfile } from './sider-profile'
import { SiderMenu } from './sider-menu'

async function CustomSider() {
  const { data } = await axios.get<TUser>('/users/me')

  return (
    <Sider
      trigger={null}
      className="p-2"
    >
      <div className="flex flex-col justify-between h-full">
        <SiderMenu />
        <SiderProfile user={data} />
      </div>
    </Sider>
  )
}

export default CustomSider
