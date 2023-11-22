'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Table, notification } from 'antd'

import { TCollection } from '@/types/collection'

import { TCategory } from '@/types/category'
import { CollectionModal } from './collections-modal'
import { Toolbar } from '@/components/table-toolbar'

export function CollectionsTable({ data }: { data: TCollection[] }) {
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<TCollection[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentRecord, setCurrentRecord] = useState<TCollection | {}>({})

  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image_url: string, record: TCollection) => {
        return image_url ? (
          <Image
            src={image_url}
            alt={`Collection ${record.title} image`}
          />
        ) : (
          <div>No image</div>
        )
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: TCollection) => {
        return <Link href={`/collections/${record._id}`}>{title}</Link>
      }
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (id: string, record: TCollection) => {
        return <Button onClick={() => onEdit(record)}>Edit</Button>
      }
    }
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: TCollection[]) => {
      setSelectedRowKeys(_selectedRowKeys)
      setSelectedRows(_selectedRows)
    }
  }

  const handleOk = async (payload: TCollection) => {
    let filteredData: Partial<Record<keyof TCollection, any>> = {}

    for (const [key, value] of Object.entries(payload)) {
      if (typeof value !== 'undefined') {
        filteredData[key as keyof TCollection] = value
      }
    }

    const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/users`)
    if (usersResponse.ok) {
      const me = await usersResponse.json()
      filteredData.user = me._id
    } else {
      const { message } = await usersResponse.json()
      notification.error({ message })
    }

    let collectionResponse
    if ('_id' in currentRecord) {
      collectionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/collections/${currentRecord._id}`, {
        method: 'PATCH',
        body: JSON.stringify(filteredData)
      })
    } else {
      collectionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/collections`, {
        method: 'POST',
        body: JSON.stringify(filteredData)
      })
    }

    if (collectionResponse.ok) {
      setIsModalOpen(false)
      setCurrentRecord({})
      router.refresh()
    } else {
      const { message } = await collectionResponse.json()
      notification.error({ message })
    }
  }

  const handleCancel = () => {
    setCurrentRecord({})
    setIsModalOpen(false)
  }

  const onAdd = () => {
    setIsModalOpen(true)
  }

  function onEdit(record: TCollection) {
    setCurrentRecord(record)
    setIsModalOpen(true)
  }

  async function onDelete() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((collection) => {
          return fetch(`${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/collections/${collection._id}`, {
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
          buttons={['add', 'delete']}
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
      <CollectionModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={currentRecord}
      />
    </>
  )
}
