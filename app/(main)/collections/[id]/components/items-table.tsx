'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Table, notification } from 'antd'

// import { Toolbar } from './collections-toolbar'
import { TCategory } from '@/types/category'
import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'
import { NO_VALUE } from '@/constants'
// import { CollectionModal } from './collections-modal'

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
    render?: (text: string | string[]) => string
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
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (id: string, record: TItem) => {
    //     return <Button onClick={() => onEdit(record)}>Edit</Button>
    //   }
    // }
  ]
  console.log(data)
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
          debugger
          return value ? String(value) : NO_VALUE
        }
      })
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: TItem[]) => {
      setSelectedRowKeys(_selectedRowKeys)
      setSelectedRows(_selectedRows)
    }
  }

  const handleOk = async (payload: TItem) => {
    // let filteredData: Partial<Record<keyof TItem, any>> = {}
    // for (const [key, value] of Object.entries(payload)) {
    //   if (typeof value !== 'undefined') {
    //     filteredData[key as keyof TItem] = value
    //   }
    // }
    // const usersResponse = await fetch('api/users')
    // if (usersResponse.ok) {
    //   const me = await usersResponse.json()
    //   filteredData.user = me._id
    // } else {
    //   const { message } = await usersResponse.json()
    //   notification.error({ message })
    // }
    // let collectionResponse
    // if ('_id' in currentRecord) {
    //   collectionResponse = await fetch(`api/collections/${currentRecord._id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify(filteredData)
    //   })
    // } else {
    //   collectionResponse = await fetch('api/collections', {
    //     method: 'POST',
    //     body: JSON.stringify(filteredData)
    //   })
    // }
    // if (collectionResponse.ok) {
    //   setIsModalOpen(false)
    //   setCurrentRecord({})
    //   router.refresh()
    // } else {
    //   const { message } = await collectionResponse.json()
    //   notification.error({ message })
    // }
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
    // if (selectedRows.length > 0) {
    //   await Promise.allSettled(
    //     selectedRows.map((collection) => {
    //       return fetch(`api/collections/${collection._id}`, {
    //         method: 'DELETE'
    //       })
    //     })
    //   )
    //   setSelectedRowKeys([])
    //   router.refresh()
    // }
  }

  return (
    <>
      <div className="mb-6">
        {/* <Toolbar
          eventHandlers={{
            onDelete,
            onAdd
          }}
        /> */}
      </div>
      <Table
        rowKey="_id"
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection, type: 'checkbox' }}
      />
      {/* <CollectionModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={currentRecord}
      /> */}
    </>
  )
}
