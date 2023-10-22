import React from 'react'
import Link from 'next/link'
import SignUp from './components/sign-up'

function SignUpPage() {
  return (
    <div className="w-1/5 p-8 border border-slate-200">
      <div className="flex justify-center align-middle mb-6 text-xl">
        <Link href="/sign-in">Sign in</Link>
        <span className="mx-2">/</span>
        <h1 className="text-center">Sign up</h1>
      </div>
      <SignUp />
    </div>
  )
}

export default SignUpPage
