'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from 'antd'

import { TUser } from '@/types/user'

import { Toolbar } from './admin-toolbar'

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
    title: 'Last login',
    dataIndex: 'loggedInAt',
    key: 'loggedInAt',
    render: (date: string) => {
      const _date = new Date(date)

      return _date.toLocaleString()
    }
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

export function AdminTable({ data }: { data: TUser[] }) {
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

  async function onBlock() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((user) => {
          return fetch(`api/users/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ isBlocked: true })
          })
        })
      )
      setSelectedRowKeys([])
      router.refresh()
    }
  }

  async function onUnblock() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((user) => {
          return fetch(`api/users/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ isBlocked: false })
          })
        })
      )
      setSelectedRowKeys([])
      router.refresh()
    }
  }

  async function onDelete() {
    if (selectedRows.length > 0) {
      await Promise.allSettled(
        selectedRows.map((user) => {
          return fetch(`api/users/${user._id}`, {
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
