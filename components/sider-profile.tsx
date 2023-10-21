'use client'

import React from 'react'

import { TUser } from '@/types/user'

export function SiderProfile({ user }: { user: TUser }) {
  return (
    <div className="p-2">
      <span className="text-white">Hello, {user.name}!</span>
    </div>
  )
}
