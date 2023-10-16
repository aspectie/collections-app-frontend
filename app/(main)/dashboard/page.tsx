import React from 'react'

import axios from '@/lib/axios'
import { DashboardTable } from './components/dashboard-table'

type TUser = {
  _id: string
  name: string
  email: string
  password: string
  createdAt: string
  isBlocked: boolean
}

async function DashboardPage() {
  let { data } = await axios.get<TUser[]>('/users')

  return <DashboardTable data={data} />
}

export default DashboardPage
