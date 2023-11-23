import React from 'react'

import { TUser } from '@/types/user'

import { AdminTable } from './components/admin-table'
import { axiosSafeGet } from '@/utils/axiosSafeGet'

async function AdminPage() {
  const data = await axiosSafeGet<TUser[]>('/users')

  if ('error' in data) {
    throw new Error(String(data.error))
  }

  return (
    <>
      <h1 className="text-2xl mb-10">User management</h1>
      <AdminTable data={data} />
    </>
  )
}

export default AdminPage
