import React from 'react'
import axios from '@/lib/axios'

import { ItemsTable } from './components/items-table'
import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'

async function CollectionPage({ params }: { params: { id: string } }) {
  const { data } = await axios.get<TItem[]>(`/items?collection=${params.id}`)
  const collection = await axios.get<TCollection>(`/collections/${params.id}`)

  return (
    <>
      <h1 className="text-2xl mb-10">Collection {collection.data.title}</h1>
      <ItemsTable
        data={data}
        collection={collection.data}
      />
    </>
  )
}

export default CollectionPage
