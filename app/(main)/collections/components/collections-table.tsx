'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from 'antd'

import { TCollection } from '@/types/collection'

import { Toolbar } from './collections-toolbar'
import { TCategory } from '@/types/category'

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
            onDelete
          }}
        />
      </div>
      <Table
        rowKey="_id"
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection, type: 'checkbox' }}
      />
    </>
  )
}
