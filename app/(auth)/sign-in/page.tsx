import React from 'react'
import Link from 'next/link'
import SignIn from './components/sing-in'

function SignInPage() {
  return (
    <div className="w-1/5 p-8 border border-slate-200">
      <div className="flex justify-center align-middle mb-6 text-xl">
        <h1 className="ttext-center">Sign In</h1>
        <span className="mx-2">/</span>
        <Link href="/sign-up">Sign up</Link>
      </div>
      <SignIn />
    </div>
  )
}

export default SignInPage
