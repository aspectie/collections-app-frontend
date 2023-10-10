'use client'

import React from 'react'
import { setCookie } from 'nookies'
import { Button, Form, Input } from 'antd'

import axios from '@/lib/axios'

type TSingUpResponse = {
  data: {
    access_token: string
  }
}

const onSubmit = async (payload: { email: string; password: string }) => {
  try {
    const { data } = await axios.post<string, TSingUpResponse>(
      '/auth/sign-up',
      payload
    )

    if (data?.access_token) {
      setCookie(null, '__token', data.access_token, {
        path: '/'
      })
      location.href = '/dashboard'
    }
  } catch (e) {
    console.log(e)
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
