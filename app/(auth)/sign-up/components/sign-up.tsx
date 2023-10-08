'use client'

import React from 'react'
import { Button, Form, Input } from 'antd'
import axios from '@/lib/axios'
import { setCookie } from 'nookies'

const onSubmit = async (payload: { email: string; password: string }) => {
  let access_token = null
  try {
    access_token = await axios.post<string, string>('/auth/sign-up', payload)
  } catch (e) {
    console.log(e)
  }

  if (access_token) {
    setCookie(null, '_token', access_token, {
      path: '/'
    })
    location.href = '/dashboard'
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

function SignUp() {
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

export default SignUp
