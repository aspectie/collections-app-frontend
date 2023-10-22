import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: NextRequest, res: NextResponse) {
  cookies().delete('__token')

  return NextResponse.json('Signed out successfully')
}