import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('__token')

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token?.value}`
      }
    })
    
    if (res.ok) {
      return NextResponse.json(await res.json());
    } else {
      throw new NextResponse('Internal error', { status: 400 })
    }
  } catch (e) {
    console.log(e)
    throw new NextResponse('Internal error', { status: 400 })
  }
}