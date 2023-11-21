'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, notification } from 'antd'

import { TCollection } from '@/types/collection'

import { Toolbar } from './collections-toolbar'
import { TCategory } from '@/types/category'
import { AddCollectionModal } from './collections-add-modal'

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image_url: string) => {
      return image_url ? <img src={image_url} /> : <div>No image</div>
    }
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Theme',
    dataIndex: 'theme',
    key: 'theme',
    render: (category: TCategory) => {
      return category.name
    }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description: string) => {
      return description ? description : <div>No desc</div>
    }
  }
]

export function CollectionsTable({ data }: { data: TCollection[] }) {
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<TCollection[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddOk = async (payload: TCollection) => {
    let filteredData: Partial<TCollection> = {}

    // TODO: Fix types
    for (const [key, value] of Object.entries(payload)) {
      if (typeof value !== 'undefined') {
        filteredData[key as keyof TCollection] = value
      }
    }

    const usersResponse = await fetch('api/users')
    if (usersResponse.ok) {
      const me = await usersResponse.json()
      filteredData.user = me._id
    } else {
      const { message } = await usersResponse.json()
      notification.error({ message })
    }

    const addCollectionResponse = await fetch('api/collections', {
      method: 'POST',
      body: JSON.stringify(filteredData)
    })

    if (addCollectionResponse.ok) {
      setIsAddModalOpen(false)
      router.refresh()
    } else {
      const { message } = await addCollectionResponse.json()
      notification.error({ message })
    }
  }

  const handleAddCancel = () => {
    setIsAddModalOpen(false)
  }

  const onAdd = () => {
    setIsAddModalOpen(true)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: TCollection[]) => {
      setSelectedRowKeys(_selectedRowKeys)
      setSelectedRows(_selectedRows)
    }
  }

  async function onDelete() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((collection) => {
          console.log(collection)
          return fetch(`api/collections/${collection._id}`, {
            method: 'DELETE'
          })
        })
      )
      setSelectedRowKeys([])
      router.refresh()
    }
  }

  return (
    <>
      <div className="mb-6">
        <Toolbar
          eventHandlers={{
            onDelete,
            onAdd
          }}
        />
      </div>
      <Table
        rowKey="_id"
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection, type: 'checkbox' }}
      />
      <AddCollectionModal
        isModalOpen={isAddModalOpen}
        handleOk={handleAddOk}
        handleCancel={handleAddCancel}
      />
    </>
  )
}
