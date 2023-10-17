import React from 'react'
import axios from '@/lib/axios'

import { TUser } from '@/types/user'

import { DashboardTable } from './components/dashboard-table'

async function DashboardPage() {
  const { data } = await axios.get<TUser[]>('/users')

  return <DashboardTable data={data} />
}

export default DashboardPage
