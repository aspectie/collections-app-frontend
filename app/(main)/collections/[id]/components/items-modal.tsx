'use client'

import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Modal, Select, Switch } from 'antd'
import dayjs from 'dayjs'

import { TItem } from '@/types/item'
import { TCollection } from '@/types/collection'

const { TextArea } = Input

type TFormField = {
  name: string
  value: any
}

export function ItemModal({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
  collection
}: {
  isModalOpen: boolean
  handleOk: (payload: TItem) => void
  handleCancel: () => void
  data: TItem | {}
  collection: TCollection
}) {
  const customFieldsNames = ['integer', 'string', 'boolean', 'text', 'date']
  const regex = new RegExp(customFieldsNames.join('|'))
  const [form] = Form.useForm()
  const [fieldsData, setFieldsData] = useState<any>([])
  const [customFields, setCustomFields] = useState<TFormField[]>([])

  useEffect(() => {
    let _customFields = []
    let fieldobjects = []

    for (const [key, value] of Object.entries(data)) {
      const isObject = typeof value === 'object'
      const isDate = getTypeOfCustomField({ name: key, value }) === 'date'

      if (isObject) {
        fieldobjects.push({
          name: key,
          value: '_id' in value ? value._id : value
        })
      } else if (isDate) {
        const dateField = {
          name: key,
          value: dayjs(value as string)
        }
        fieldobjects.push(dateField)
      } else {
        fieldobjects.push({
          name: key,
          value
        })
      }
    }

    for (const [key, value] of Object.entries(collection)) {
      const fieldType = getTypeOfCustomField({ name: key, value })
      if (fieldType && typeof value === 'boolean' && value) {
        const fieldName = key.substring(0, fieldType.length + 1)

        _customFields.push({
          name: fieldName,
          value
        })
      }
    }

    setCustomFields(_customFields)
    form.setFields(fieldobjects)
  }, [isModalOpen])

  function getTypeOfCustomField(field: TFormField): TCustomFieldType | null {
    const match = field.name.match(regex)

    return match ? (match[0] as TCustomFieldType) : null
  }

  type TCustomFieldType = 'integer' | 'string' | 'boolean' | 'text' | 'date'

  function getFieldByType(
    type: TCustomFieldType | null
  ): React.JSX.Element | null {
    const map = {
      integer: <Input />,
      string: <Input />,
      boolean: <Switch />,
      text: <TextArea />,
      date: <DatePicker format="DD-MM-YYYY" />
    }

    return type ? map[type] : null
  }

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
            <Select mode="tags" />
          </Form.Item>
          {customFields.length > 0 &&
            customFields.map((field) => {
              return (
                <Form.Item
                  label={`Custom ${field.name}`}
                  name={field.name}
                  key={field.name}
                  valuePropName={
                    getTypeOfCustomField(field) === 'boolean'
                      ? 'checked'
                      : 'value'
                  }
                >
                  {getFieldByType(getTypeOfCustomField(field))}
                </Form.Item>
              )
            })}
        </Form>
      </Modal>
    </>
  )
}
