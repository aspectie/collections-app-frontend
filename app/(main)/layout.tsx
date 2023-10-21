import React from 'react'
import Layout, { Content } from 'antd/es/layout/layout'

import CustomSider from '@/components/sider'

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout>
        <CustomSider />
        <Content className="p-4">{children}</Content>
      </Layout>
    </>
  )
}

export default MainLayout
