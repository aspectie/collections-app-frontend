'use client'

import { Table } from 'antd'
import React from 'react'

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

export function DashboardTable({ data }: { data: any }) {
  return (
    <Table
      rowKey="_id"
      dataSource={data}
      columns={columns}
    />
  )
}
