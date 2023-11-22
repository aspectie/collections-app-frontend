'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input } from 'antd'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

function SignUp() {
  const router = useRouter()

  const onSubmit = async (payload: { email: string; password: string }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_NEXT_SERVER_API_URL}/api/auth/sign-up`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    )

    if (res.ok) {
      router.push('/')
    }
  }

  return (
    <>
      <Form
        name="basic"
        className="flex justify-end flex-wrap"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
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
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please, input your name!'
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

        <Form.Item
          className="w-full"
          label="Confirm password"
          name="confirm-password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please, confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                )
              }
            })
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

export default SignUp
