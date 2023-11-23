import React from 'react'
import { axiosSafeGet } from '@/utils/axiosSafeGet'

import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'

import { ItemsTable } from './components/items-table'

async function CollectionPage({ params }: { params: { id: string } }) {
  const data = await axiosSafeGet<TItem[]>(`/items?collection=${params.id}`)
  const collection = await axiosSafeGet<TCollection>(
    `/collections/${params.id}`
  )

  if ('error' in data) {
    throw new Error(String(data.error))
  }

  if ('error' in collection) {
    throw new Error(String(collection.error))
  }

  return (
    <>
      <h1 className="text-2xl mb-10">Collection {collection.title}</h1>
      <ItemsTable
        data={data}
        collection={collection}
      />
    </>
  )
}

export default CollectionPage
