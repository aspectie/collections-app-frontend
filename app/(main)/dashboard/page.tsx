import React from 'react'
import axios from '@/lib/axios'

import { TUser } from '@/types/user'

import { DashboardTable } from './components/dashboard-table'

async function DashboardPage() {
  const { data } = await axios.get<TUser[]>('/users')

  return (
    <>
      <h1 className="text-2xl mb-10">User management</h1>
      <DashboardTable data={data} />
    </>
  )
}

export default DashboardPage
