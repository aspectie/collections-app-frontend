import React from 'react'

import { TUser } from '@/types/user'

import Sider from 'antd/es/layout/Sider'
import { SiderProfile } from './sider-profile'
import { SiderMenu } from './sider-menu'
import { axiosSafeGet } from '@/utils/axiosSafeGet'

async function CustomSider() {
  const data = await axiosSafeGet<TUser>('/users/me')

  if ('error' in data) {
    throw new Error(String(data.error))
  }

  return (
    <Sider
      trigger={null}
      className="p-2"
    >
      <div className="flex flex-col justify-between h-full">
        <SiderMenu user={data} />
        <SiderProfile user={data} />
      </div>
    </Sider>
  )
}

export default CustomSider
