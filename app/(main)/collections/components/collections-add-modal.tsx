import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Switch } from 'antd'
import { TCollection } from '@/types/collection'
import { TCategory } from '@/types/category'

const { TextArea } = Input

export function AddCollectionModal({
  isModalOpen,
  handleOk,
  handleCancel
}: {
  isModalOpen: boolean
  handleOk: (payload: TCollection) => void
  handleCancel: () => void
}) {
  const [form] = Form.useForm()
  const [categories, setCategories] = useState<TCategory[]>([])

  useEffect(() => {
    fetch('api/categories').then(async (res) => {
      const data = await res.json()

      setCategories(data)
    })
  }, [])

  // TODO: Create a separate tab for custom fields
  return (
    <>
      <Modal
        title="Create a new collection"
        open={isModalOpen}
        afterClose={form.resetFields}
        width={1000}
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
            Submit
          </Button>
        ]}
      >
        <Form
          form={form}
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
            label="Theme"
            name="theme"
          >
            <Select>
              {categories.map((category) => {
                return (
                  <Select.Option
                    value={category._id}
                    key={category._id}
                  >
                    {category.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Custom number 1"
            valuePropName="checked"
            name="integer1_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Number 1 title"
            name="integer1_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom number 2"
            valuePropName="checked"
            name="integer2_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Number 2 title"
            name="integer2_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom number 3"
            valuePropName="checked"
            name="integer3_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Number 3 title"
            name="integer3_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom string 1"
            valuePropName="checked"
            name="string1_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="String 1 title"
            name="string1_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom string 2"
            valuePropName="checked"
            name="string2_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="String 2 title"
            name="string2_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom string 3"
            valuePropName="checked"
            name="string3_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="String 3 title"
            name="string3_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom text 1"
            valuePropName="checked"
            name="text1_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Text 1 title"
            name="text1_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom text 2"
            valuePropName="checked"
            name="text2_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Text 2 title"
            name="text2_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom text 3"
            valuePropName="checked"
            name="text3_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Text 3 title"
            name="text3_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom boolean 1"
            valuePropName="checked"
            name="boolean1_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Boolean 1 title"
            name="boolean1_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom boolean 2"
            valuePropName="checked"
            name="boolean2_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Boolean 2 title"
            name="boolean2_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom boolean 3"
            valuePropName="checked"
            name="boolean3_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Boolean 3 title"
            name="boolean3_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom date 1"
            valuePropName="checked"
            name="date1_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Date 1 title"
            name="date1_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom date 2"
            valuePropName="checked"
            name="date2_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Date 1 title"
            name="date2_name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Custom date 3"
            valuePropName="checked"
            name="date3_enabled"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Date 3 title"
            name="date3_name"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
