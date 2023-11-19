import React from 'react'
import axios from '@/lib/axios'

import { TUser } from '@/types/user'

import { AdminTable } from './components/admin-table'

async function AdminPage() {
  const { data } = await axios.get<TUser[]>('/users')

  return (
    <>
      <h1 className="text-2xl mb-10">User management</h1>
      <AdminTable data={data} />
    </>
  )
}

export default AdminPage
