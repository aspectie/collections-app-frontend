'use client'
import React from 'react'
import { Button, Form, Input, notification } from 'antd'

const onSubmit = async (payload: { email: string; password: string }) => {
  const res = await fetch('api/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  if (res.ok) {
    location.href = '/dashboard'
  } else {
    const { message } = await res.json()
    notification.error({ message })
  }
}

export const SignIn = () => {
  return (
    <>
      <Form
        name="basic"
        className="flex justify-end flex-wrap"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          email: 'a@mail.ru',
          password: 'a'
        }}
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          className="w-full"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please, input your email!'
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please, input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item noStyle={true}>
          <Button
            size="large"
            className="w-full mt-3"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SignIn
