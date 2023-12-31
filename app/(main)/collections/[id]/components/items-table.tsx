'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Table, notification } from 'antd'

import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'

import { NO_VALUE } from '@/constants'
import { Toolbar } from '@/components/table-toolbar'
import { ItemModal } from './items-modal'

export function ItemsTable({
  data,
  collection
}: {
  data: TItem[]
  collection: TCollection
}) {
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<TItem[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [currentRecord, setCurrentRecord] = useState<TItem | {}>({})

  const [isModalOpen, setIsModalOpen] = useState(false)

  type TColumn = {
    title: string
    dataIndex: string
    key: string
    render?: (
      text: string | string[],
      record: TItem
    ) => string | React.JSX.Element
  }

  const columns: TColumn[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => {
        return Array.isArray(tags) && tags.length > 0
          ? tags.reduce((acc, tag) => {
              return acc !== '' ? `${acc}, ${tag}` : tag
            }, '')
          : NO_VALUE
      }
    }
  ]
  for (const [key, value] of Object.entries(collection)) {
    if (key.search('enabled') > -1 && value) {
      const columnId = key.split('_')[0]
      const columnName = columnId + '_name'
      const columnTitle = collection[columnName as keyof TCollection]

      columns.push({
        title: String(columnTitle),
        dataIndex: columnId,
        key: columnId,
        render: (value) => {
          return value ? String(value) : NO_VALUE
        }
      })
    }
  }
  columns.push({
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_, record: TItem) => {
      return <Button onClick={() => onEdit(record)}>Edit</Button>
    }
  })

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: TItem[]) => {
      setSelectedRowKeys(_selectedRowKeys)
      setSelectedRows(_selectedRows)
    }
  }

  const handleOk = async (payload: TItem) => {
    let filteredData: Partial<Record<keyof TItem, any>> = {}
    for (const [key, value] of Object.entries(payload)) {
      if (typeof value !== 'undefined') {
        filteredData[key as keyof TItem] = value
      }
    }
    debugger

    filteredData._collection = collection._id

    let itemResponse
    if ('_id' in currentRecord) {
      itemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/items/${currentRecord._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(filteredData)
        }
      )
    } else {
      itemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/items`,
        {
          method: 'POST',
          body: JSON.stringify(filteredData)
        }
      )
    }

    if (itemResponse.ok) {
      setIsModalOpen(false)
      setCurrentRecord({})
      router.refresh()
    } else {
      const { message } = await itemResponse.json()
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

  function onEdit(record: TItem) {
    setCurrentRecord(record)
    setIsModalOpen(true)
  }

  async function onDelete() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((item) => {
          debugger
          return fetch(
            `${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/items/${item._id}`,
            {
              method: 'DELETE'
            }
          )
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
      <ItemModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={currentRecord}
        collection={collection}
      />
    </>
  )
}
