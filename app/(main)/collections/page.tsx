import React from 'react'
import axios from '@/lib/axios'

import { TCollection } from '@/types/collection'

import { CollectionsTable } from './components/collections-table'

async function CollectionsPage() {
  const { data } = await axios.get<TCollection[]>('/collections/me')

  return (
    <>
      <h1 className="text-2xl mb-10">Collections management</h1>
      <CollectionsTable data={data} />
    </>
  )
}

export default CollectionsPage
