'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from 'antd'

import { TUser } from '@/types/user'

import { Toolbar } from './dashboard-toolbar'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Status',
    dataIndex: 'isBlocked',
    key: 'isBlocked',
    render: (text: boolean) => {
      return text ? 'Blocked' : 'Active'
    }
  }
]

export function DashboardTable({ data }: { data: TUser[] }) {
  const router = useRouter()
  const [selectedRows, setSelectedRows] = useState<TUser[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: React.Key[], _selectedRows: TUser[]) => {
      setSelectedRowKeys(_selectedRowKeys)
      setSelectedRows(_selectedRows)
    }
  }

  function onBlock() {
    if (selectedRows.length > 0) {
      Promise.allSettled(
        selectedRows.map((user) => {
          fetch(`api/users/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ isBlocked: true })
          })
        })
      ).then(() => {
        setSelectedRowKeys([])
        router.refresh()
      })
    }
  }

  function onUnblock() {
    if (selectedRows.length > 0) {
      Promise.allSettled(
        selectedRows.map((user) => {
          fetch(`api/users/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ isBlocked: false })
          })
        })
      ).then(() => {
        setSelectedRowKeys([])
        router.refresh()
      })
    }
  }

  function onDelete() {
    if (selectedRows.length > 0) {
      Promise.allSettled(
        selectedRows.map((user) => {
          fetch(`api/users/${user._id}`, {
            method: 'DELETE'
          })
        })
      ).then(() => {
        setSelectedRowKeys([])
        router.refresh()
      })
    }
  }

  return (
    <>
      <div className="mb-6">
        <Toolbar
          eventHandlers={{
            onBlock,
            onUnblock,
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
