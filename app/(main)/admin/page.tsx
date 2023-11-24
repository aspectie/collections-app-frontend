import React from 'react'

import { TUser } from '@/types/user'

import { AdminTable } from './components/admin-table'
import { cookies } from 'next/headers'

async function getUsers(): Promise<TUser[]> {
  const token = cookies().get('__token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/users`,
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

async function AdminPage() {
  const data = await getUsers()

  return (
    <>
      <h1 className="text-2xl mb-10">User management</h1>
      <AdminTable data={data} />
    </>
  )
}

export default AdminPage
