import React from 'react'
import { cookies } from 'next/headers'

import { TUser } from '@/types/user'

import Sider from 'antd/es/layout/Sider'
import { SiderProfile } from './sider-profile'
import { SiderMenu } from './sider-menu'

async function getMe(): Promise<TUser> {
  const token = cookies().get('__token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/users/me`,
    {
      headers: {
        Authorization: 'Bearer ' + token?.value
      }
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function CustomSider() {
  const data = await getMe()

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
