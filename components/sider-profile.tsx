'use client'

import React from 'react'

import { TUser } from '@/types/user'

import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export function SiderProfile({ user }: { user: TUser }) {
  const router = useRouter()

  async function onClick() {
    await fetch('api/auth/sign-out', {
      method: 'POST'
    })
    router.refresh()
  }
  return (
    <div className="p-2">
      <p className="text-white mb-6">Hello, {user.name}!</p>
      <Button
        onClick={onClick}
        className="w-full"
      >
        Sign out
      </Button>
    </div>
  )
}
