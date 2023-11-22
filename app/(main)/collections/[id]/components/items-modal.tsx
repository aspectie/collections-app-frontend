import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { TItem } from '@/types/item'

const { TextArea } = Input

export function ItemModal({
  isModalOpen,
  handleOk,
  handleCancel,
  data
}: {
  isModalOpen: boolean
  handleOk: (payload: TItem) => void
  handleCancel: () => void
  data: TItem | {}
}) {
  const [form] = Form.useForm()
  const [fieldsData, setFieldsData] = useState<any>([])

  // useEffect(() => {
  //   let fieldobjects = []

  //   for (const [key, value] of Object.entries(data)) {
  //     if (typeof value === 'object') {
  //       fieldobjects.push({
  //         name: key,
  //         value: value?._id
  //       })
  //     } else {
  //       fieldobjects.push({
  //         name: key,
  //         value
  //       })
  //     }
  //   }
  //   form.setFields(fieldobjects)
  // }, [isModalOpen])

  // TODO: Create a separate tab for custom fields
  return (
    <>
      <Modal
        title="Create a new item"
        open={isModalOpen}
        afterClose={form.resetFields}
        width={800}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
        centered={true}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            htmlType="submit"
          >
            Save
          </Button>
        ]}
      >
        <Form
          form={form}
          fields={fieldsData}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          onFinish={handleOk}
        >
          <Form.Item
            label="Title"
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
          >
            <Select mode="multiple" />
          </Form.Item>
          {/* <Form.Item
            label="Custom number 1"
            name="integer1"
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  )
}
