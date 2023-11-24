import React from 'react'

import { TCollection } from '@/types/collection'

import { CollectionsTable } from './components/collections-table'
import { cookies } from 'next/headers'

async function getCollections(): Promise<TCollection[]> {
  const token = cookies().get('__token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/collections/me`,
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

async function CollectionsPage() {
  const data = await getCollections()

  return (
    <>
      <h1 className="text-2xl mb-10">Collections management</h1>
      <CollectionsTable data={data} />
    </>
  )
}

export default CollectionsPage
