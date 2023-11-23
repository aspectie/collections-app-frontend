import React from 'react'

import { TCollection } from '@/types/collection'

import { CollectionsTable } from './components/collections-table'
import { axiosSafeGet } from '@/utils/axiosSafeGet'

async function CollectionsPage() {
  const data = await axiosSafeGet<TCollection[]>('/collection/me')

  if ('error' in data) {
    throw new Error(String(data.error))
  }

  return (
    <>
      <h1 className="text-2xl mb-10">Collections management</h1>
      <CollectionsTable data={data} />
    </>
  )
}

export default CollectionsPage
