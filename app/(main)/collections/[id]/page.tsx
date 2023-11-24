import React from 'react'

import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'

import { ItemsTable } from './components/items-table'
import { cookies } from 'next/headers'

async function getItems(id: string): Promise<TItem[]> {
  const token = cookies().get('__token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/items?collection=${id}`,
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

async function getCollection(id: string): Promise<TCollection> {
  const token = cookies().get('__token')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/collections/${id}`,
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

async function CollectionPage({ params }: { params: { id: string } }) {
  const items = await getItems(params.id)
  const collection = await getCollection(params.id)

  return (
    <>
      <h1 className="text-2xl mb-10">Collection {collection.title}</h1>
      <ItemsTable
        data={items}
        collection={collection}
      />
    </>
  )
}

export default CollectionPage
